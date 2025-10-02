import * as tf from '@tensorflow/tfjs';

// Risk calculation utilities
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
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;

  constructor() {
    this.initializeModel();
  }

  private async initializeModel() {
    try {
      // In a production environment, you would load a pre-trained model
      // For now, we'll create a simple neural network
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [7], units: 16, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.3 }),
          tf.layers.dense({ units: 8, activation: 'relu' }),
          tf.layers.dense({ units: 1, activation: 'sigmoid' })
        ]
      });

      this.model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      });

      this.isModelLoaded = true;
    } catch (error) {
      console.error('Error initializing ML model:', error);
    }
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
    const riskScore = 
      factors.attendance * weights.attendance +
      factors.academic * weights.academic +
      factors.financial * weights.financial +
      factors.engagement * weights.engagement;

    const riskLevel = this.determineRiskLevel(riskScore);
    const recommendations = this.generateRecommendations(factors, data);

    return {
      riskScore: Math.round(riskScore * 100) / 100,
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
    let academicRisk = 0;

    // Grade-based risk
    if (averageGrade < 40) academicRisk += 0.4;
    else if (averageGrade < 60) academicRisk += 0.3;
    else if (averageGrade < 75) academicRisk += 0.2;
    else academicRisk += 0.1;

    // Submission rate risk
    if (submissionRate < 50) academicRisk += 0.3;
    else if (submissionRate < 75) academicRisk += 0.2;
    else if (submissionRate < 90) academicRisk += 0.1;

    // Multiple attempts penalty
    if (attempts > 3) academicRisk += 0.3;
    else if (attempts > 2) academicRisk += 0.2;
    else if (attempts > 1) academicRisk += 0.1;

    return Math.min(academicRisk, 1.0);
  }

  private calculateFinancialRisk(paymentStatus: string, daysSinceLastPayment: number): number {
    switch (paymentStatus) {
      case 'paid':
        return 0.1;
      case 'pending':
        return daysSinceLastPayment > 30 ? 0.6 : 0.3;
      case 'overdue':
        return daysSinceLastPayment > 90 ? 1.0 : 0.8;
      default:
        return 0.5;
    }
  }

  private calculateEngagementRisk(engagementScore: number): number {
    // Engagement score is assumed to be 0-100
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

  private generateRecommendations(factors: RiskFactors, _data: StudentData): string[] {
    const recommendations: string[] = [];

    if (factors.attendance > 0.5) {
      recommendations.push('Schedule attendance counseling session');
      recommendations.push('Implement attendance tracking and reminders');
    }

    if (factors.academic > 0.5) {
      recommendations.push('Arrange academic support and tutoring');
      recommendations.push('Review study methods and time management');
    }

    if (factors.financial > 0.5) {
      recommendations.push('Contact student about fee payment options');
      recommendations.push('Provide information about financial assistance programs');
    }

    if (factors.engagement > 0.5) {
      recommendations.push('Increase student engagement through interactive activities');
      recommendations.push('Schedule one-on-one mentoring sessions');
    }

    if (recommendations.length === 0) {
      recommendations.push('Continue monitoring student progress');
      recommendations.push('Maintain regular check-ins');
    }

    return recommendations;
  }

  // ML-based prediction (when model is available)
  private async predictWithML(data: StudentData): Promise<number> {
    if (!this.isModelLoaded || !this.model) {
      throw new Error('ML model not loaded');
    }

    // Normalize input features
    const features = this.normalizeFeatures(data);
    const inputTensor = tf.tensor2d([features]);
    
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const riskScore = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();

    return riskScore[0];
  }

  private normalizeFeatures(data: StudentData): number[] {
    return [
      data.attendancePercentage / 100,
      data.averageGrade / 100,
      data.assignmentSubmissionRate / 100,
      Math.min(data.numberOfAttempts / 5, 1), // Normalize attempts to 0-1
      data.feePaymentStatus === 'paid' ? 0 : data.feePaymentStatus === 'pending' ? 0.5 : 1,
      Math.min(data.daysSinceLastPayment / 365, 1), // Normalize days to 0-1
      data.engagementScore / 100
    ];
  }

  // Main prediction method
  public async predictRisk(data: StudentData): Promise<RiskPrediction> {
    try {
      // Use rule-based calculation as primary method for transparency
      const ruleBasedPrediction = this.calculateRuleBasedRisk(data);

      // If ML model is available, use it to refine the prediction
      if (this.isModelLoaded && this.model) {
        try {
          const mlRiskScore = await this.predictWithML(data);
          // Combine rule-based and ML predictions (weighted average)
          const combinedRiskScore = (ruleBasedPrediction.riskScore * 0.7) + (mlRiskScore * 0.3);
          
          return {
            ...ruleBasedPrediction,
            riskScore: Math.round(combinedRiskScore * 100) / 100,
            riskLevel: this.determineRiskLevel(combinedRiskScore)
          };
        } catch (mlError) {
          console.warn('ML prediction failed, using rule-based prediction:', mlError);
        }
      }

      return ruleBasedPrediction;
    } catch (error) {
      console.error('Error in risk prediction:', error);
      throw error;
    }
  }

  // Batch prediction for multiple students
  public async predictBatchRisk(studentsData: StudentData[]): Promise<RiskPrediction[]> {
    const predictions: RiskPrediction[] = [];
    
    for (const studentData of studentsData) {
      try {
        const prediction = await this.predictRisk(studentData);
        predictions.push(prediction);
      } catch (error) {
        console.error('Error predicting risk for student:', error);
        // Return a default high-risk prediction for failed cases
        predictions.push({
          riskScore: 0.8,
          riskLevel: 'high',
          factors: { attendance: 0.8, academic: 0.8, financial: 0.8, engagement: 0.8 },
          recommendations: ['Manual review required due to prediction error']
        });
      }
    }

    return predictions;
  }

  // Train the model with new data (for continuous learning)
  public async trainModel(trainingData: { features: StudentData[], labels: number[] }) {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    try {
      const normalizedFeatures = trainingData.features.map(data => this.normalizeFeatures(data));
      const xs = tf.tensor2d(normalizedFeatures);
      const ys = tf.tensor2d(trainingData.labels, [trainingData.labels.length, 1]);

      await this.model.fit(xs, ys, {
        epochs: 50,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
          }
        }
      });

      xs.dispose();
      ys.dispose();

      console.log('Model training completed');
    } catch (error) {
      console.error('Error training model:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const riskAnalysisEngine = new RiskAnalysisEngine();