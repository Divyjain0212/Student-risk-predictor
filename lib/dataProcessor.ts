import ExcelJS from 'exceljs';
import csv from 'csv-parser';
import { Readable } from 'stream';

export interface ParsedStudentRecord {
  studentId: string;
  name: string;
  email: string;
  course: string;
  year: number;
  semester: number;
  guardianEmail?: string;
  guardianPhone?: string;
}

export interface ParsedAttendanceRecord {
  studentId: string;
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  month: number;
  year: number;
}

export interface ParsedAssessmentRecord {
  studentId: string;
  subject: string;
  assessmentType: 'quiz' | 'assignment' | 'midterm' | 'final' | 'project';
  maxScore: number;
  obtainedScore: number;
  attempts: number;
  submissionDate: string;
}

export interface ParsedFeeRecord {
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  semester: number;
  year: number;
}

export class DataProcessor {
  
  // Parse CSV files
  static async parseCSV(buffer: Buffer, type: 'students' | 'attendance' | 'assessments' | 'fees'): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      stream
        .pipe(csv())
        .on('data', (data) => {
          const cleanedData = this.cleanAndValidateData(data, type);
          if (cleanedData) {
            results.push(cleanedData);
          }
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  // Parse Excel files
  static async parseExcel(buffer: Buffer, type: 'students' | 'attendance' | 'assessments' | 'fees'): Promise<any[]> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer as any);
      
      const worksheet = workbook.worksheets[0];
      if (!worksheet) {
        throw new Error('No worksheet found in Excel file');
      }

      const rawData: any[] = [];
      const headers: string[] = [];
      
      // Get headers from first row
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell, colNumber) => {
        headers[colNumber - 1] = String(cell.value || '').trim();
      });

      // Process data rows
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        
        const rowData: any = {};
        row.eachCell((cell, colNumber) => {
          const header = headers[colNumber - 1];
          if (header) {
            rowData[header] = cell.value;
          }
        });
        
        if (Object.keys(rowData).length > 0) {
          rawData.push(rowData);
        }
      });

      return rawData.map(row => this.cleanAndValidateData(row, type)).filter(Boolean);
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      throw new Error('Failed to parse Excel file');
    }
  }

  // Clean and validate data based on type
  private static cleanAndValidateData(data: any, type: string): any | null {
    try {
      switch (type) {
        case 'students':
          return this.validateStudentData(data);
        case 'attendance':
          return this.validateAttendanceData(data);
        case 'assessments':
          return this.validateAssessmentData(data);
        case 'fees':
          return this.validateFeeData(data);
        default:
          return null;
      }
    } catch (error) {
      console.warn('Data validation failed:', error);
      return null;
    }
  }

  private static validateStudentData(data: any): ParsedStudentRecord | null {
    const requiredFields = ['studentId', 'name', 'email', 'course', 'year', 'semester'];
    
    // Check for required fields
    for (const field of requiredFields) {
      if (!data[field] && !data[field.toLowerCase()] && !data[field.toUpperCase()]) {
        return null;
      }
    }

    // Normalize field names
    const normalized = this.normalizeFieldNames(data);

    return {
      studentId: String(normalized.studentId || normalized.student_id || normalized.id).trim(),
      name: String(normalized.name || normalized.student_name).trim(),
      email: String(normalized.email).toLowerCase().trim(),
      course: String(normalized.course || normalized.program).trim(),
      year: parseInt(normalized.year) || 1,
      semester: parseInt(normalized.semester) || 1,
      guardianEmail: normalized.guardian_email ? String(normalized.guardian_email).toLowerCase().trim() : undefined,
      guardianPhone: normalized.guardian_phone ? String(normalized.guardian_phone).trim() : undefined,
    };
  }

  private static validateAttendanceData(data: any): ParsedAttendanceRecord | null {
    const normalized = this.normalizeFieldNames(data);

    if (!normalized.studentId && !normalized.student_id) return null;
    if (!normalized.subject) return null;

    const totalClasses = parseInt(normalized.total_classes || normalized.totalClasses) || 0;
    const attendedClasses = parseInt(normalized.attended_classes || normalized.attendedClasses) || 0;

    if (totalClasses <= 0) return null;

    return {
      studentId: String(normalized.studentId || normalized.student_id).trim(),
      subject: String(normalized.subject).trim(),
      totalClasses,
      attendedClasses: Math.min(attendedClasses, totalClasses),
      month: parseInt(normalized.month) || new Date().getMonth() + 1,
      year: parseInt(normalized.year) || new Date().getFullYear(),
    };
  }

  private static validateAssessmentData(data: any): ParsedAssessmentRecord | null {
    const normalized = this.normalizeFieldNames(data);

    if (!normalized.studentId && !normalized.student_id) return null;
    if (!normalized.subject) return null;

    const maxScore = parseFloat(normalized.max_score || normalized.maxScore) || 0;
    const obtainedScore = parseFloat(normalized.obtained_score || normalized.obtainedScore || normalized.score) || 0;

    if (maxScore <= 0) return null;

    const validTypes = ['quiz', 'assignment', 'midterm', 'final', 'project'];
    const assessmentType = String(normalized.assessment_type || normalized.type || 'assignment').toLowerCase();
    
    return {
      studentId: String(normalized.studentId || normalized.student_id).trim(),
      subject: String(normalized.subject).trim(),
      assessmentType: validTypes.includes(assessmentType) ? assessmentType as any : 'assignment',
      maxScore,
      obtainedScore: Math.min(obtainedScore, maxScore),
      attempts: parseInt(normalized.attempts) || 1,
      submissionDate: this.parseDate(normalized.submission_date || normalized.submissionDate || normalized.date) || new Date().toISOString(),
    };
  }

  private static validateFeeData(data: any): ParsedFeeRecord | null {
    const normalized = this.normalizeFieldNames(data);

    if (!normalized.studentId && !normalized.student_id) return null;

    const amount = parseFloat(normalized.amount || normalized.fee_amount) || 0;
    if (amount <= 0) return null;

    const dueDate = this.parseDate(normalized.due_date || normalized.dueDate);
    if (!dueDate) return null;

    return {
      studentId: String(normalized.studentId || normalized.student_id).trim(),
      amount,
      dueDate: dueDate,
      paidDate: this.parseDate(normalized.paid_date || normalized.paidDate) || undefined,
      semester: parseInt(normalized.semester) || 1,
      year: parseInt(normalized.year) || new Date().getFullYear(),
    };
  }

  private static normalizeFieldNames(data: any): any {
    const normalized: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '_');
      normalized[normalizedKey] = value;
      normalized[key] = value; // Keep original key as well
    }
    
    return normalized;
  }

  private static parseDate(dateString: any): string | null {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      return date.toISOString();
    } catch {
      return null;
    }
  }

  // Data quality assessment
  static assessDataQuality(records: any[]): {
    totalRecords: number;
    validRecords: number;
    invalidRecords: number;
    completenessRate: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let validRecords = 0;

    records.forEach((record, index) => {
      let isValid = true;
      
      // Check for required fields based on record type
      if (!record.studentId) {
        issues.push(`Row ${index + 1}: Missing student ID`);
        isValid = false;
      }

      if (isValid) validRecords++;
    });

    const completenessRate = records.length > 0 ? (validRecords / records.length) * 100 : 0;

    return {
      totalRecords: records.length,
      validRecords,
      invalidRecords: records.length - validRecords,
      completenessRate: Math.round(completenessRate * 100) / 100,
      issues: issues.slice(0, 20) // Limit to first 20 issues
    };
  }

  // Data deduplication
  static deduplicateRecords(records: any[], keyFields: string[]): any[] {
    const seen = new Set();
    return records.filter(record => {
      const key = keyFields.map(field => record[field]).join('|');
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Detect file format
  static detectFileFormat(filename: string): 'csv' | 'excel' | 'unknown' {
    const ext = filename.toLowerCase().split('.').pop();
    
    if (ext === 'csv') return 'csv';
    if (['xlsx', 'xls'].includes(ext || '')) return 'excel';
    return 'unknown';
  }

  // Main processing function
  static async processFile(
    buffer: Buffer,
    filename: string,
    dataType: 'students' | 'attendance' | 'assessments' | 'fees'
  ): Promise<{
    data: any[];
    quality: ReturnType<typeof DataProcessor.assessDataQuality>;
    summary: {
      filename: string;
      fileType: string;
      dataType: string;
      processedAt: string;
    };
  }> {
    try {
      const fileFormat = this.detectFileFormat(filename);
      
      if (fileFormat === 'unknown') {
        throw new Error('Unsupported file format. Please upload CSV or Excel files.');
      }

      let rawData: any[];

      if (fileFormat === 'csv') {
        rawData = await this.parseCSV(buffer, dataType);
      } else {
        rawData = await this.parseExcel(buffer, dataType);
      }

      // Remove duplicates based on studentId and relevant fields
      const keyFields = dataType === 'students' ? ['studentId'] : 
                       dataType === 'attendance' ? ['studentId', 'subject', 'month', 'year'] :
                       dataType === 'assessments' ? ['studentId', 'subject', 'assessmentType', 'submissionDate'] :
                       ['studentId', 'semester', 'year'];

      const deduplicatedData = this.deduplicateRecords(rawData, keyFields);
      const quality = this.assessDataQuality(deduplicatedData);

      return {
        data: deduplicatedData,
        quality,
        summary: {
          filename,
          fileType: fileFormat,
          dataType,
          processedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  }
}