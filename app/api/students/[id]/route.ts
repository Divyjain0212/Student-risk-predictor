import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Student, Attendance, Assessment, FeePayment, RiskScore } from '@/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const studentId = params.id;

    // Get student details
    const student = await Student.findById(studentId).populate('mentorId', 'name email');
    
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Get attendance records
    const attendanceRecords = await Attendance.find({ studentId })
      .sort({ year: -1, month: -1 })
      .limit(12);

    // Get assessment records
    const assessmentRecords = await Assessment.find({ studentId })
      .sort({ submissionDate: -1 })
      .limit(20);

    // Get fee payment records
    const feeRecords = await FeePayment.find({ studentId })
      .sort({ year: -1, semester: -1 })
      .limit(6);

    // Get risk score history
    const riskHistory = await RiskScore.find({ studentId })
      .sort({ calculatedAt: -1 })
      .limit(10);

    // Calculate statistics
    const stats = {
      averageAttendance: attendanceRecords.length > 0 
        ? attendanceRecords.reduce((sum: number, record: any) => sum + record.attendancePercentage, 0) / attendanceRecords.length
        : 0,
      averageGrade: assessmentRecords.length > 0
        ? assessmentRecords.reduce((sum: number, record: any) => sum + record.percentage, 0) / assessmentRecords.length
        : 0,
      totalAssessments: assessmentRecords.length,
      submittedAssessments: assessmentRecords.filter((r: any) => r.obtainedScore > 0).length,
      pendingFees: feeRecords.filter((f: any) => f.status === 'pending' || f.status === 'overdue').length,
      totalFeeAmount: feeRecords.reduce((sum: number, fee: any) => sum + fee.amount, 0),
      paidFeeAmount: feeRecords.filter((f: any) => f.status === 'paid').reduce((sum: number, fee: any) => sum + fee.amount, 0)
    };

    // Group attendance by subject
    const attendanceBySubject = attendanceRecords.reduce((acc: any, record: any) => {
      const key = record.subject;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    }, {} as Record<string, any[]>);

    // Group assessments by subject
    const assessmentsBySubject = assessmentRecords.reduce((acc: any, record: any) => {
      const key = record.subject;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      success: true,
      student: {
        _id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        course: student.course,
        year: student.year,
        semester: student.semester,
        guardianEmail: student.guardianEmail,
        guardianPhone: student.guardianPhone,
        currentRiskScore: student.currentRiskScore,
        riskLevel: student.riskLevel,
        mentor: student.mentorId,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      },
      attendance: {
        records: attendanceRecords,
        bySubject: attendanceBySubject
      },
      assessments: {
        records: assessmentRecords,
        bySubject: assessmentsBySubject
      },
      fees: feeRecords,
      riskHistory,
      statistics: stats
    });

  } catch (error) {
    console.error('Error fetching student details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student details' },
      { status: 500 }
    );
  }
}