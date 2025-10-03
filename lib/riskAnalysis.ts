// Risk calculation utilities - Server-safe implementation without TensorFlow.js
export interface StudentData {
  attendancePercentage: number;
  averageGrade: number;
  assignmentSubmissionRate: number;
  numberOfAttempts: number;
  feePaymentStatus: 'paid' | 'pending' | 'overdue';
  daysSinceLastPayment: number;
  engagementScore: number; // Based on login frequency, resource access, etc.
}

export interface RiskFactors {
  attendance: number;
  academic: number;
  financial: number;
  engagement: number;
}

export interface RiskPrediction {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: RiskFactors;
  recommendations: string[];
}

export class RiskAnalysisEngine {
  constructor() {
    console.log('Risk Analysis Engine initialized (rule-based)');
  }

  // Main prediction function using rule-based calculation
  async predictRisk(data: StudentData): Promise<RiskPrediction> {
    return this.calculateRuleBasedRisk(data);
  }

  // Rule-based risk calculation for transparency
  private calculateRuleBasedRisk(data: StudentData): RiskPrediction {
    const factors: RiskFactors = {
      attendance: this.calculateAttendanceRisk(data.attendancePercentage),
      academic: this.calculateAcademicRisk(data.averageGrade, data.assignmentSubmissionRate, data.numberOfAttempts),
      financial: this.calculateFinancialRisk(data.feePaymentStatus, data.daysSinceLastPayment),
      engagement: this.calculateEngagementRisk(data.engagementScore)
    };

    // Weighted average of risk factors
    const weights = { attendance: 0.3, academic: 0.4, financial: 0.2, engagement: 0.1 };
    
    const riskScore = (
      factors.attendance * weights.attendance +
      factors.academic * weights.academic +
      factors.financial * weights.financial +
      factors.engagement * weights.engagement
    );

    const riskLevel = this.determineRiskLevel(riskScore);
    const recommendations = this.generateRecommendations(factors, riskLevel);

    return {
      riskScore,
      riskLevel,
      factors,
      recommendations
    };
  }

  private calculateAttendanceRisk(attendancePercentage: number): number {
    if (attendancePercentage >= 90) return 0.1;
    if (attendancePercentage >= 80) return 0.3;
    if (attendancePercentage >= 70) return 0.6;
    if (attendancePercentage >= 60) return 0.8;
    return 1.0;
  }

  private calculateAcademicRisk(averageGrade: number, submissionRate: number, attempts: number): number {
    let risk = 0;
    
    // Grade-based risk (assuming 0-100 scale)
    if (averageGrade < 40) risk += 0.5;
    else if (averageGrade < 60) risk += 0.3;
    else if (averageGrade < 75) risk += 0.1;
    
    // Submission rate risk
    if (submissionRate < 0.5) risk += 0.3;
    else if (submissionRate < 0.7) risk += 0.2;
    else if (submissionRate < 0.9) risk += 0.1;
    
    // Multiple attempts risk (normalized)
    const attemptRisk = Math.min(attempts / 10, 0.2);
    risk += attemptRisk;
    
    return Math.min(risk, 1.0);
  }

  private calculateFinancialRisk(status: string, daysSincePayment: number): number {
    switch (status) {
      case 'overdue':
        return Math.min(0.7 + (daysSincePayment / 30) * 0.3, 1.0);
      case 'pending':
        return Math.min(0.4 + (daysSincePayment / 60) * 0.3, 0.7);
      case 'paid':
        return 0.1;
      default:
        return 0.5;
    }
  }

  private calculateEngagementRisk(engagementScore: number): number {
    // Assuming engagement score is 0-100
    if (engagementScore >= 80) return 0.1;
    if (engagementScore >= 60) return 0.3;
    if (engagementScore >= 40) return 0.6;
    if (engagementScore >= 20) return 0.8;
    return 1.0;
  }

  private determineRiskLevel(riskScore: number): 'low' | 'medium' | 'high' {
    if (riskScore <= 0.3) return 'low';
    if (riskScore <= 0.6) return 'medium';
    return 'high';
  }

  private generateRecommendations(factors: RiskFactors, riskLevel: string): string[] {
    const recommendations: string[] = [];

    if (factors.attendance > 0.5) {
      recommendations.push('Improve attendance - consider scheduling conflicts or transportation issues');
    }

    if (factors.academic > 0.5) {
      recommendations.push('Academic support needed - consider tutoring or study groups');
    }

    if (factors.financial > 0.5) {
      recommendations.push('Financial assistance may be required - explore scholarship or aid options');
    }

    if (factors.engagement > 0.5) {
      recommendations.push('Increase engagement - check for motivation or personal issues');
    }

    if (riskLevel === 'high') {
      recommendations.push('Immediate intervention required - schedule counseling session');
    } else if (riskLevel === 'medium') {
      recommendations.push('Monitor closely and provide proactive support');
    }

    return recommendations;
  }

  // Additional utility methods
  public calculateBulkRisk(studentDataArray: StudentData[]): Promise<RiskPrediction[]> {
    return Promise.all(studentDataArray.map(data => this.predictRisk(data)));
  }

  public generateRiskReport(predictions: RiskPrediction[]): {
    totalStudents: number;
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    averageRiskScore: number;
  } {
    const total = predictions.length;
    const high = predictions.filter(p => p.riskLevel === 'high').length;
    const medium = predictions.filter(p => p.riskLevel === 'medium').length;
    const low = predictions.filter(p => p.riskLevel === 'low').length;
    const averageScore = predictions.reduce((sum, p) => sum + p.riskScore, 0) / total;

    return {
      totalStudents: total,
      highRisk: high,
      mediumRisk: medium,
      lowRisk: low,
      averageRiskScore: parseFloat(averageScore.toFixed(3))
    };
  }

  // Mock data generation for testing
  public generateMockStudentData(): StudentData {
    return {
      attendancePercentage: Math.random() * 100,
      averageGrade: Math.random() * 100,
      assignmentSubmissionRate: Math.random(),
      numberOfAttempts: Math.floor(Math.random() * 5) + 1,
      feePaymentStatus: ['paid', 'pending', 'overdue'][Math.floor(Math.random() * 3)] as any,
      daysSinceLastPayment: Math.floor(Math.random() * 90),
      engagementScore: Math.random() * 100
    };
  }
}

// Create and export a singleton instance
export const riskAnalysisEngine = new RiskAnalysisEngine();