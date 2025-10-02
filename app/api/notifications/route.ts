import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Student, Notification } from '@/models';
import { notificationService } from '@/lib/notificationService';
import { riskAnalysisEngine } from '@/lib/riskAnalysis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, filters } = body;

    await connectToDatabase();

    if (action === 'send_risk_alerts') {
      return await sendRiskAlerts(filters);
    } else if (action === 'send_attendance_alerts') {
      return await sendAttendanceAlerts(filters);
    } else if (action === 'send_fee_alerts') {
      return await sendFeeAlerts(filters);
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Failed to process notification request' },
      { status: 500 }
    );
  }
}

async function sendRiskAlerts(filters: Record<string, any>) {
  try {
    // Get high-risk students
    const query: Record<string, any> = { riskLevel: 'high' };
    if (filters?.course) query.course = filters.course;
    if (filters?.year) query.year = filters.year;

    const highRiskStudents = await Student.find(query)
      .populate('mentorId', 'name email')
      .limit(50);

    const notifications = [];
    const emails = [];

    for (const student of highRiskStudents) {
      // Get student data for notification
      const studentData = await getStudentDataForNotification(student._id);
      const riskPrediction = await riskAnalysisEngine.predictRisk(studentData);

      const notificationData = {
        name: student.name,
        studentId: student.studentId,
        riskLevel: student.riskLevel,
        riskScore: student.currentRiskScore,
        course: student.course,
        year: student.year,
        factors: riskPrediction.factors,
        recommendations: riskPrediction.recommendations,
      };

      // Send to mentor if assigned
      if (student.mentorId && student.mentorId.email) {
        const mentorEmail = notificationService.generateRiskAlertEmail(notificationData, 'mentor');
        mentorEmail.to = student.mentorId.email;
        emails.push(mentorEmail);

        // Save notification record
        notifications.push({
          recipientId: student.mentorId._id,
          recipientType: 'mentor',
          studentId: student._id,
          type: 'risk_alert',
          message: `High risk alert for ${student.name} - Risk Score: ${(student.currentRiskScore * 100).toFixed(1)}%`,
        });
      }

      // Send to guardian if email available
      if (student.guardianEmail) {
        const guardianEmail = notificationService.generateRiskAlertEmail(notificationData, 'guardian');
        guardianEmail.to = student.guardianEmail;
        emails.push(guardianEmail);

        notifications.push({
          recipientId: student.guardianEmail,
          recipientType: 'guardian',
          studentId: student._id,
          type: 'risk_alert',
          message: `High risk alert for ${student.name} - Risk Score: ${(student.currentRiskScore * 100).toFixed(1)}%`,
        });
      }
    }

    // Send emails
    const emailResults = await notificationService.sendBulkEmails(emails);

    // Save notification records
    for (const notification of notifications) {
      await Notification.create(notification);
    }

    return NextResponse.json({
      success: true,
      message: `Risk alerts sent to ${emailResults.sent} recipients`,
      stats: {
        studentsProcessed: highRiskStudents.length,
        emailsSent: emailResults.sent,
        emailsFailed: emailResults.failed,
      }
    });

  } catch (error) {
    console.error('Error sending risk alerts:', error);
    throw error;
  }
}

async function sendAttendanceAlerts(_filters: Record<string, any>) {
  try {
    const { Attendance } = await import('@/models');
    
    // Get students with low attendance
    const lowAttendanceRecords = await Attendance.find({
      attendancePercentage: { $lt: 75 }
    })
    .populate('studentId')
    .limit(100);

    const notifications = [];
    const emails = [];

    for (const record of lowAttendanceRecords) {
      const student = record.studentId;
      if (!student) continue;

      const studentData = {
        name: student.name,
        studentId: student.studentId,
        course: student.course,
        attendancePercentage: record.attendancePercentage,
        subject: record.subject,
      };

      const attendanceEmail = notificationService.generateAttendanceAlertEmail(studentData);

      // Send to mentor
      if (student.mentorId) {
        const mentor = await import('@/models').then(m => m.User.findById(student.mentorId));
        if (mentor?.email) {
          attendanceEmail.to = mentor.email;
          emails.push({ ...attendanceEmail });

          notifications.push({
            recipientId: mentor._id,
            recipientType: 'mentor',
            studentId: student._id,
            type: 'attendance_low',
            message: `Low attendance alert for ${student.name} in ${record.subject}: ${record.attendancePercentage.toFixed(1)}%`,
          });
        }
      }

      // Send to guardian
      if (student.guardianEmail) {
        attendanceEmail.to = student.guardianEmail;
        emails.push({ ...attendanceEmail });

        notifications.push({
          recipientId: student.guardianEmail,
          recipientType: 'guardian',
          studentId: student._id,
          type: 'attendance_low',
          message: `Low attendance alert for ${student.name} in ${record.subject}: ${record.attendancePercentage.toFixed(1)}%`,
        });
      }
    }

    const emailResults = await notificationService.sendBulkEmails(emails);

    for (const notification of notifications) {
      await Notification.create(notification);
    }

    return NextResponse.json({
      success: true,
      message: `Attendance alerts sent to ${emailResults.sent} recipients`,
      stats: {
        recordsProcessed: lowAttendanceRecords.length,
        emailsSent: emailResults.sent,
        emailsFailed: emailResults.failed,
      }
    });

  } catch (error) {
    console.error('Error sending attendance alerts:', error);
    throw error;
  }
}

async function sendFeeAlerts(_filters: Record<string, any>) {
  try {
    const { FeePayment } = await import('@/models');
    
    // Get overdue fee payments
    const overduePayments = await FeePayment.find({
      status: 'overdue',
      dueDate: { $lt: new Date() }
    })
    .populate('studentId')
    .limit(100);

    const notifications = [];
    const emails = [];

    for (const payment of overduePayments) {
      const student = payment.studentId;
      if (!student || !student.guardianEmail) continue;

      const daysPastDue = Math.floor((Date.now() - payment.dueDate.getTime()) / (1000 * 60 * 60 * 24));

      const studentData = {
        name: student.name,
        studentId: student.studentId,
        course: student.course,
        amount: payment.amount,
        dueDate: payment.dueDate.toISOString(),
        daysPastDue,
      };

      const feeEmail = notificationService.generateFeeOverdueEmail(studentData);
      feeEmail.to = student.guardianEmail;
      emails.push(feeEmail);

      notifications.push({
        recipientId: student.guardianEmail,
        recipientType: 'guardian',
        studentId: student._id,
        type: 'payment_overdue',
        message: `Overdue payment for ${student.name}: $${payment.amount.toLocaleString()} (${daysPastDue} days past due)`,
      });
    }

    const emailResults = await notificationService.sendBulkEmails(emails);

    for (const notification of notifications) {
      await Notification.create(notification);
    }

    return NextResponse.json({
      success: true,
      message: `Fee alerts sent to ${emailResults.sent} recipients`,
      stats: {
        paymentsProcessed: overduePayments.length,
        emailsSent: emailResults.sent,
        emailsFailed: emailResults.failed,
      }
    });

  } catch (error) {
    console.error('Error sending fee alerts:', error);
    throw error;
  }
}

// Helper function to get student data for risk calculation in notifications
async function getStudentDataForNotification(studentId: string) {
  const { Attendance, Assessment, FeePayment } = await import('@/models');
  
  const attendanceRecords = await Attendance.find({ studentId }).limit(6);
  const assessmentRecords = await Assessment.find({ studentId }).limit(10);
  const feeRecords = await FeePayment.find({ studentId }).limit(3);
  
  const avgAttendance = attendanceRecords.length > 0 
    ? attendanceRecords.reduce((sum, record) => sum + record.attendancePercentage, 0) / attendanceRecords.length
    : 75;

  const avgGrade = assessmentRecords.length > 0
    ? assessmentRecords.reduce((sum, record) => sum + record.percentage, 0) / assessmentRecords.length
    : 70;

  const submissionRate = assessmentRecords.length > 0
    ? (assessmentRecords.filter(r => r.obtainedScore > 0).length / assessmentRecords.length) * 100
    : 80;

  const avgAttempts = assessmentRecords.length > 0
    ? assessmentRecords.reduce((sum, record) => sum + record.attempts, 0) / assessmentRecords.length
    : 1;

  const latestFee = feeRecords[0];
  const feeStatus = latestFee ? latestFee.status : 'paid';
  const daysSinceLastPayment = latestFee && latestFee.paidDate
    ? Math.floor((Date.now() - latestFee.paidDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return {
    attendancePercentage: avgAttendance,
    averageGrade: avgGrade,
    assignmentSubmissionRate: submissionRate,
    numberOfAttempts: avgAttempts,
    feePaymentStatus: feeStatus as 'paid' | 'pending' | 'overdue',
    daysSinceLastPayment,
    engagementScore: Math.min(avgAttendance + (submissionRate * 0.5), 100)
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');

    await connectToDatabase();

    const query: Record<string, any> = {};
    if (type && type !== 'all') {
      query.type = type;
    }

    const notifications = await Notification.find(query)
      .populate('studentId', 'name studentId course')
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      notifications: notifications.map(notification => ({
        _id: notification._id,
        recipientType: notification.recipientType,
        student: notification.studentId,
        type: notification.type,
        message: notification.message,
        sent: notification.sent,
        sentAt: notification.sentAt,
        createdAt: notification.createdAt,
      }))
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}