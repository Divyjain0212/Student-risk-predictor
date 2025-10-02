import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  // Temporary disable for Vercel compatibility
  if (process.env.VERCEL) {
    return NextResponse.json({
      error: 'File uploads temporarily disabled on Vercel. Use cloud storage in production.',
    }, { status: 501 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const studentId = formData.get('studentId') as string;
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported. Please upload PDF, DOC, DOCX, JPG, PNG, or TXT files.' },
        { status: 400 }
      );
    }

    // Create upload directory structure
    const uploadDir = join(process.cwd(), 'uploads', 'documents', studentId || 'anonymous', category);
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = join(uploadDir, fileName);

    // Convert file to buffer and save
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // Create file metadata
    const fileMetadata = {
      originalName: file.name,
      fileName: fileName,
      filePath: filePath,
      fileSize: file.size,
      fileType: file.type,
      category: category,
      studentId: studentId,
      uploadDate: new Date(),
      status: 'uploaded'
    };

    // TODO: Save metadata to database for tracking
    // This would typically go to a DocumentUpload model

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: fileMetadata.uploadDate
      }
    });

  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload document', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // TODO: Fetch uploaded documents from database
    // For now, return mock data
    const mockDocuments = [
      {
        id: '1',
        name: 'Assignment_1.pdf',
        size: 256000,
        type: 'application/pdf',
        category: 'assignments',
        uploadDate: new Date(Date.now() - 86400000), // 1 day ago
        status: 'uploaded'
      },
      {
        id: '2',
        name: 'Transcript.pdf',
        size: 512000,
        type: 'application/pdf',
        category: 'certificates',
        uploadDate: new Date(Date.now() - 172800000), // 2 days ago
        status: 'uploaded'
      }
    ];

    return NextResponse.json({
      success: true,
      documents: mockDocuments
    });

  } catch (error) {
    console.error('Get documents error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}