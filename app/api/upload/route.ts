import { NextRequest, NextResponse } from 'next/server';
import { DataProcessor } from '@/lib/dataProcessor';
import connectToDatabase from '@/lib/mongodb';
import { Student, Attendance, Assessment, FeePayment } from '../../../models';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const dataType = formData.get('dataType') as 'students' | 'attendance' | 'assessments' | 'fees';

    if (!file || !dataType) {
      return NextResponse.json(
        { error: 'File and data type are required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process the file
    const result = await DataProcessor.processFile(buffer, file.name, dataType);

    // Connect to database
    await connectToDatabase();

    // Save data to database based on type
    let savedCount = 0;
    const errors: string[] = [];

    for (const record of result.data) {
      try {
        switch (dataType) {
          case 'students':
            await Student.findOneAndUpdate(
              { studentId: record.studentId },
              record,
              { upsert: true, new: true }
            );
            break;

          case 'attendance':
            const attendancePercentage = (record.attendedClasses / record.totalClasses) * 100;
            await Attendance.findOneAndUpdate(
              {
                studentId: await getStudentObjectId(record.studentId),
                subject: record.subject,
                month: record.month,
                year: record.year
              },
              {
                ...record,
                studentId: await getStudentObjectId(record.studentId),
                attendancePercentage
              },
              { upsert: true, new: true }
            );
            break;

          case 'assessments':
            const percentage = (record.obtainedScore / record.maxScore) * 100;
            await Assessment.findOneAndUpdate(
              {
                studentId: await getStudentObjectId(record.studentId),
                subject: record.subject,
                assessmentType: record.assessmentType,
                submissionDate: new Date(record.submissionDate)
              },
              {
                ...record,
                studentId: await getStudentObjectId(record.studentId),
                percentage,
                submissionDate: new Date(record.submissionDate)
              },
              { upsert: true, new: true }
            );
            break;

          case 'fees':
            const status = record.paidDate ? 'paid' : 
                          new Date(record.dueDate) < new Date() ? 'overdue' : 'pending';
            await FeePayment.findOneAndUpdate(
              {
                studentId: await getStudentObjectId(record.studentId),
                semester: record.semester,
                year: record.year
              },
              {
                ...record,
                studentId: await getStudentObjectId(record.studentId),
                dueDate: new Date(record.dueDate),
                paidDate: record.paidDate ? new Date(record.paidDate) : undefined,
                status
              },
              { upsert: true, new: true }
            );
            break;
        }
        savedCount++;
      } catch (error) {
        errors.push(`Error saving record ${JSON.stringify(record)}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${savedCount} records`,
      summary: result.summary,
      quality: result.quality,
      savedCount,
      errors: errors.slice(0, 10) // Limit error messages
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to get student ObjectId by studentId
async function getStudentObjectId(studentId: string) {
  const student = await Student.findOne({ studentId });
  if (!student) {
    // Create a placeholder student if not found
    const newStudent = await Student.create({
      studentId,
      name: `Student ${studentId}`,
      email: `${studentId}@placeholder.com`,
      course: 'Unknown',
      year: 1,
      semester: 1
    });
    return newStudent._id;
  }
  return student._id;
}