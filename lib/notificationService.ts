import nodemailer from 'nodemailer';

export interface EmailNotification {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(notification: EmailNotification): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@studentrisk.com',
        to: notification.to,
        subject: notification.subject,
        html: notification.html,
        text: notification.text || this.stripHtml(notification.html),
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async sendBulkEmails(notifications: EmailNotification[]): Promise<{ sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;

    for (const notification of notifications) {
      const success = await this.sendEmail(notification);
      if (success) {
        sent++;
      } else {
        failed++;
      }
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { sent, failed };
  }

  generateRiskAlertEmail(studentData: {
    name: string;
    studentId: string;
    riskLevel: string;
    riskScore: number;
    course: string;
    year: number;
    factors: {
      attendance: number;
      academic: number;
      financial: number;
      engagement: number;
    };
    recommendations: string[];
  }, recipientType: 'mentor' | 'guardian'): EmailNotification {
    const subject = `🚨 ${studentData.riskLevel.toUpperCase()} Risk Alert: ${studentData.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Risk Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 20px; border: 1px solid #ddd; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
          .risk-indicator { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
          .risk-high { background: #fee2e2; color: #dc2626; }
          .risk-medium { background: #fef3c7; color: #d97706; }
          .risk-low { background: #d1fae5; color: #059669; }
          .factors { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .factor { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
          .factor-score { font-size: 24px; font-weight: bold; margin: 5px 0; }
          .recommendations { background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .recommendations ul { margin: 0; padding-left: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 Student Risk Alert</h1>
            <p>Early Warning System Notification</p>
          </div>
          
          <div class="content">
            <p>Dear ${recipientType === 'mentor' ? 'Mentor' : 'Guardian'},</p>
            
            <p>This is an automated alert from the Student Risk Prediction System. We've identified that the following student requires attention:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Student Information</h3>
              <p><strong>Name:</strong> ${studentData.name}</p>
              <p><strong>Student ID:</strong> ${studentData.studentId}</p>
              <p><strong>Course:</strong> ${studentData.course}</p>
              <p><strong>Year:</strong> ${studentData.year}</p>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <span class="risk-indicator risk-${studentData.riskLevel}">
                ${studentData.riskLevel.toUpperCase()} RISK - ${(studentData.riskScore * 100).toFixed(1)}%
              </span>
            </div>
            
            <h3>Risk Factor Breakdown</h3>
            <div class="factors">
              <div class="factor">
                <div>📚 Attendance</div>
                <div class="factor-score">${(studentData.factors.attendance * 100).toFixed(1)}%</div>
              </div>
              <div class="factor">
                <div>🎓 Academic</div>
                <div class="factor-score">${(studentData.factors.academic * 100).toFixed(1)}%</div>
              </div>
              <div class="factor">
                <div>💰 Financial</div>
                <div class="factor-score">${(studentData.factors.financial * 100).toFixed(1)}%</div>
              </div>
              <div class="factor">
                <div>📈 Engagement</div>
                <div class="factor-score">${(studentData.factors.engagement * 100).toFixed(1)}%</div>
              </div>
            </div>
            
            <div class="recommendations">
              <h3 style="margin-top: 0;">📋 Recommended Actions</h3>
              <ul>
                ${studentData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
              </ul>
            </div>
            
            <p><strong>Action Required:</strong> Please review this student's profile and consider implementing the recommended interventions as soon as possible.</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/student/${studentData.studentId}" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Student Profile
              </a>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from the Student Risk Prediction System.</p>
            <p>If you have any questions, please contact the academic support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: '', // Will be set by caller
      subject,
      html,
    };
  }

  generateAttendanceAlertEmail(studentData: {
    name: string;
    studentId: string;
    course: string;
    attendancePercentage: number;
    subject: string;
  }): EmailNotification {
    const subject = `📅 Low Attendance Alert: ${studentData.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 20px; border: 1px solid #ddd; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
          .attendance-bar { background: #e5e7eb; height: 20px; border-radius: 10px; margin: 10px 0; }
          .attendance-fill { background: #f59e0b; height: 100%; border-radius: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Attendance Alert</h1>
          </div>
          
          <div class="content">
            <p>Dear Mentor/Guardian,</p>
            
            <p>We've detected low attendance for the following student:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Student:</strong> ${studentData.name} (${studentData.studentId})</p>
              <p><strong>Course:</strong> ${studentData.course}</p>
              <p><strong>Subject:</strong> ${studentData.subject}</p>
              <p><strong>Current Attendance:</strong></p>
              <div class="attendance-bar">
                <div class="attendance-fill" style="width: ${studentData.attendancePercentage}%"></div>
              </div>
              <p style="text-align: center; font-weight: bold; color: #f59e0b;">${studentData.attendancePercentage.toFixed(1)}%</p>
            </div>
            
            <p><strong>Please take immediate action to improve attendance and prevent academic issues.</strong></p>
          </div>
          
          <div class="footer">
            <p>Student Risk Prediction System - Automated Alert</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: '',
      subject,
      html,
    };
  }

  generateFeeOverdueEmail(studentData: {
    name: string;
    studentId: string;
    course: string;
    amount: number;
    dueDate: string;
    daysPastDue: number;
  }): EmailNotification {
    const subject = `💰 Fee Payment Overdue: ${studentData.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 20px; border: 1px solid #ddd; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
          .amount { font-size: 24px; font-weight: bold; color: #dc2626; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 Fee Payment Overdue</h1>
          </div>
          
          <div class="content">
            <p>Dear Guardian,</p>
            
            <p>This is a reminder that a fee payment is overdue for:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Student:</strong> ${studentData.name} (${studentData.studentId})</p>
              <p><strong>Course:</strong> ${studentData.course}</p>
              <p><strong>Due Date:</strong> ${new Date(studentData.dueDate).toLocaleDateString()}</p>
              <p><strong>Days Past Due:</strong> ${studentData.daysPastDue} days</p>
            </div>
            
            <div class="amount">
              Amount Due: $${studentData.amount.toLocaleString()}
            </div>
            
            <p><strong>Please settle this payment as soon as possible to avoid any academic holds or restrictions.</strong></p>
          </div>
          
          <div class="footer">
            <p>Student Risk Prediction System - Automated Alert</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: '',
      subject,
      html,
    };
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
}

export const notificationService = new NotificationService();