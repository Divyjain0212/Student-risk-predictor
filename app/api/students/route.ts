import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Student, RiskScore } from '@/models';
import { riskAnalysisEngine } from '@/lib/riskAnalysis';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mentorId = searchParams.get('mentorId');
    const riskLevel = searchParams.get('riskLevel');
    const course = searchParams.get('course');
    const year = searchParams.get('year');

    await connectToDatabase();

    // Build query based on filters
    let query: Record<string, any> = {};
    
    if (mentorId) {
      query.mentorId = mentorId;
    }
    
    if (riskLevel && riskLevel !== 'all') {
      query.riskLevel = riskLevel;
    }
    
    if (course && course !== 'all') {
      query.course = course;
    }
    
    if (year && year !== 'all') {
      query.year = parseInt(year);
    }

    const students = await Student.find(query)
      .populate('mentorId', 'name email')
      .sort({ currentRiskScore: -1 })
      .limit(100);

    return NextResponse.json({
      success: true,
      students: students.map((student: any) => ({
        _id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        course: student.course,
        year: student.year,
        semester: student.semester,
        currentRiskScore: student.currentRiskScore,
        riskLevel: student.riskLevel,
        mentor: student.mentorId,
        updatedAt: student.updatedAt
      }))
    });

  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, studentIds } = body;

    await connectToDatabase();

    if (action === 'recalculate_risk') {
      const updatedStudents = [];

      for (const studentId of studentIds) {
        try {
          const student = await Student.findById(studentId);
          if (!student) continue;

          // Get student data for risk calculation
          const studentData = await getStudentDataForRisk(student._id);
          const riskPrediction = await riskAnalysisEngine.predictRisk(studentData);

          // Update student risk score
          await Student.findByIdAndUpdate(studentId, {
            currentRiskScore: riskPrediction.riskScore,
            riskLevel: riskPrediction.riskLevel
          });

          // Save risk score history
          await RiskScore.create({
            studentId: student._id,
            riskScore: riskPrediction.riskScore,
            riskLevel: riskPrediction.riskLevel,
            factors: riskPrediction.factors
          });

          updatedStudents.push({
            studentId: student.studentId,
            newRiskScore: riskPrediction.riskScore,
            newRiskLevel: riskPrediction.riskLevel
          });

        } catch (error) {
          console.error(`Error recalculating risk for student ${studentId}:`, error);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Recalculated risk scores for ${updatedStudents.length} students`,
        updatedStudents
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Helper function to get student data for risk calculation
async function getStudentDataForRisk(studentId: string) {
  const { Attendance, Assessment, FeePayment } = await import('../../../models');
  
  // Get recent attendance data
  const attendanceRecords = await Attendance.find({ studentId })
    .sort({ year: -1, month: -1 })
    .limit(6);
  
  const avgAttendance = attendanceRecords.length > 0 
    ? attendanceRecords.reduce((sum: number, record: any) => sum + record.attendancePercentage, 0) / attendanceRecords.length
    : 75; // Default assumption

  // Get recent assessment data
  const assessmentRecords = await Assessment.find({ studentId })
    .sort({ submissionDate: -1 })
    .limit(10);
  
  const avgGrade = assessmentRecords.length > 0
    ? assessmentRecords.reduce((sum: number, record: any) => sum + record.percentage, 0) / assessmentRecords.length
    : 70; // Default assumption

  const submissionRate = assessmentRecords.length > 0
    ? (assessmentRecords.filter((r: any) => r.obtainedScore > 0).length / assessmentRecords.length) * 100
    : 80; // Default assumption

  const avgAttempts = assessmentRecords.length > 0
    ? assessmentRecords.reduce((sum: number, record: any) => sum + record.attempts, 0) / assessmentRecords.length
    : 1;

  // Get fee payment data
  const feeRecords = await FeePayment.find({ studentId })
    .sort({ year: -1, semester: -1 })
    .limit(3);
  
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
    engagementScore: Math.min(avgAttendance + (submissionRate * 0.5), 100) // Simple engagement calculation
  };
}