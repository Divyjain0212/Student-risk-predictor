import mongoose, { Schema, Document, Types } from 'mongoose';

// User Schema for Authentication
export interface IUser extends Document {
  email?: string;
  phone?: string;
  password: string;
  name: string;
  role: 'admin' | 'mentor' | 'counselor' | 'student';
  studentId?: string; // Only for students
  department?: string; // For mentors/admin
  specialization?: string; // For counselors
  assignedStudents?: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'mentor', 'counselor', 'student'], 
    required: true,
    default: 'student'
  },
  studentId: { type: String, unique: true, sparse: true },
  department: { type: String },
  specialization: { type: String },
  assignedStudents: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
}, { timestamps: true });

// Student Schema
export interface IStudent extends Document {
  studentId: string;
  name: string;
  email: string;
  course: string;
  year: number;
  semester: number;
  guardianEmail?: string;
  guardianPhone?: string;
  mentorId?: Types.ObjectId;
  currentRiskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  guardianEmail: String,
  guardianPhone: String,
  mentorId: { type: Schema.Types.ObjectId, ref: 'User' },
  currentRiskScore: { type: Number, default: 0 },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
}, { timestamps: true });

// Attendance Schema
export interface IAttendance extends Document {
  studentId: Types.ObjectId;
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  month: number;
  year: number;
  createdAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  totalClasses: { type: Number, required: true },
  attendedClasses: { type: Number, required: true },
  attendancePercentage: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
}, { timestamps: true });

// Assessment Schema
export interface IAssessment extends Document {
  studentId: Types.ObjectId;
  subject: string;
  assessmentType: 'quiz' | 'assignment' | 'midterm' | 'final' | 'project';
  maxScore: number;
  obtainedScore: number;
  percentage: number;
  attempts: number;
  submissionDate: Date;
  createdAt: Date;
}

const AssessmentSchema = new Schema<IAssessment>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  assessmentType: { 
    type: String, 
    enum: ['quiz', 'assignment', 'midterm', 'final', 'project'], 
    required: true 
  },
  maxScore: { type: Number, required: true },
  obtainedScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  attempts: { type: Number, default: 1 },
  submissionDate: { type: Date, required: true },
}, { timestamps: true });

// Fee Payment Schema
export interface IFeePayment extends Document {
  studentId: Types.ObjectId;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  semester: number;
  year: number;
  createdAt: Date;
}

const FeePaymentSchema = new Schema<IFeePayment>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: Date,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
  semester: { type: Number, required: true },
  year: { type: Number, required: true },
}, { timestamps: true });

// Risk Score History Schema
export interface IRiskScore extends Document {
  studentId: Types.ObjectId;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: {
    attendance: number;
    academic: number;
    financial: number;
    engagement: number;
  };
  calculatedAt: Date;
  createdAt: Date;
}

const RiskScoreSchema = new Schema<IRiskScore>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  riskScore: { type: Number, required: true },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
  factors: {
    attendance: { type: Number, required: true },
    academic: { type: Number, required: true },
    financial: { type: Number, required: true },
    engagement: { type: Number, required: true },
  },
  calculatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Notification Schema
export interface INotification extends Document {
  recipientId: string;
  recipientType: 'mentor' | 'guardian';
  studentId: Types.ObjectId;
  type: 'risk_alert' | 'attendance_low' | 'payment_overdue' | 'academic_concern';
  message: string;
  sent: boolean;
  sentAt?: Date;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipientId: { type: String, required: true },
  recipientType: { type: String, enum: ['mentor', 'guardian'], required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  type: { 
    type: String, 
    enum: ['risk_alert', 'attendance_low', 'payment_overdue', 'academic_concern'], 
    required: true 
  },
  message: { type: String, required: true },
  sent: { type: Boolean, default: false },
  sentAt: Date,
}, { timestamps: true });

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);
export const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);
export const FeePayment = mongoose.models.FeePayment || mongoose.model<IFeePayment>('FeePayment', FeePaymentSchema);
export const RiskScore = mongoose.models.RiskScore || mongoose.model<IRiskScore>('RiskScore', RiskScoreSchema);
export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);