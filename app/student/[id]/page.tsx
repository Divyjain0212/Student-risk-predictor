'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StudentData {
  student: {
    _id: string;
    studentId: string;
    name: string;
    email: string;
    course: string;
    year: number;
    semester: number;
    guardianEmail?: string;
    guardianPhone?: string;
    currentRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    mentor?: {
      name: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  attendance: {
    records: any[];
    bySubject: Record<string, any[]>;
  };
  assessments: {
    records: any[];
    bySubject: Record<string, any[]>;
  };
  fees: any[];
  riskHistory: any[];
  statistics: {
    averageAttendance: number;
    averageGrade: number;
    totalAssessments: number;
    submittedAssessments: number;
    pendingFees: number;
    totalFeeAmount: number;
    paidFeeAmount: number;
  };
}

export default function StudentProfile() {
  const params = useParams();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'assessments' | 'fees' | 'risk'>('overview');

  useEffect(() => {
    if (params.id) {
      fetchStudentData(params.id as string);
    }
  }, [params.id]);

  const fetchStudentData = async (studentId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/students/${studentId}`);
      const data = await response.json();
      
      if (data.success) {
        setStudentData(data);
      } else {
        console.error('Failed to fetch student data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIndicator = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Student not found</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { student, attendance, assessments, fees, riskHistory, statistics } = studentData;

  // Prepare chart data
  const attendanceChartData = {
    labels: attendance.records.map(record => `${record.month}/${record.year}`).reverse(),
    datasets: [
      {
        label: 'Attendance Percentage',
        data: attendance.records.map(record => record.attendancePercentage).reverse(),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const gradesChartData = {
    labels: assessments.records.slice(0, 10).map(record => 
      `${record.subject} (${record.assessmentType})`
    ).reverse(),
    datasets: [
      {
        label: 'Grade Percentage',
        data: assessments.records.slice(0, 10).map(record => record.percentage).reverse(),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const riskTrendData = {
    labels: riskHistory.map(record => 
      new Date(record.calculatedAt).toLocaleDateString()
    ).reverse(),
    datasets: [
      {
        label: 'Risk Score',
        data: riskHistory.map(record => record.riskScore * 100).reverse(),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const feeStatusData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [
          fees.filter(f => f.status === 'paid').length,
          fees.filter(f => f.status === 'pending').length,
          fees.filter(f => f.status === 'overdue').length,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(251, 191, 36, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <p className="text-gray-600">{student.studentId} • {student.course}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{getRiskIndicator(student.riskLevel)}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(student.riskLevel)}`}>
                {student.riskLevel.toUpperCase()} RISK
              </span>
              <div className="text-right">
                <p className="text-sm text-gray-600">Risk Score</p>
                <p className="text-xl font-bold">{(student.currentRiskScore * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'attendance', label: 'Attendance' },
              { key: 'assessments', label: 'Assessments' },
              { key: 'fees', label: 'Fees' },
              { key: 'risk', label: 'Risk Analysis' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Student Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {student.email}</p>
                  <p><span className="font-medium">Year:</span> {student.year}</p>
                  <p><span className="font-medium">Semester:</span> {student.semester}</p>
                  {student.guardianEmail && (
                    <p><span className="font-medium">Guardian:</span> {student.guardianEmail}</p>
                  )}
                  {student.mentor && (
                    <p><span className="font-medium">Mentor:</span> {student.mentor.name}</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Avg. Attendance:</span> {statistics.averageAttendance.toFixed(1)}%</p>
                  <p><span className="font-medium">Avg. Grade:</span> {statistics.averageGrade.toFixed(1)}%</p>
                  <p><span className="font-medium">Assessments:</span> {statistics.submittedAssessments}/{statistics.totalAssessments}</p>
                  <p><span className="font-medium">Submission Rate:</span> {
                    statistics.totalAssessments > 0 
                      ? ((statistics.submittedAssessments / statistics.totalAssessments) * 100).toFixed(1)
                      : 0
                  }%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Status</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Total Fees:</span> ${statistics.totalFeeAmount.toLocaleString()}</p>
                  <p><span className="font-medium">Paid:</span> ${statistics.paidFeeAmount.toLocaleString()}</p>
                  <p><span className="font-medium">Pending:</span> {statistics.pendingFees} payments</p>
                  <p><span className="font-medium">Payment Rate:</span> {
                    statistics.totalFeeAmount > 0 
                      ? ((statistics.paidFeeAmount / statistics.totalFeeAmount) * 100).toFixed(1)
                      : 0
                  }%</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Trend</h3>
                <Line data={attendanceChartData} options={chartOptions} />
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Grades</h3>
                <Bar data={gradesChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Attendance Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month/Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attended</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendance.records.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.month}/{record.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.attendedClasses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.totalClasses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          record.attendancePercentage >= 75 
                            ? 'bg-green-100 text-green-800'
                            : record.attendancePercentage >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.attendancePercentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Assessment Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assessments.records.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.assessmentType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.obtainedScore}/{record.maxScore}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          record.percentage >= 80 
                            ? 'bg-green-100 text-green-800'
                            : record.percentage >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.percentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.attempts}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.submissionDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Status Distribution</h3>
                <Doughnut data={feeStatusData} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">${statistics.totalFeeAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid Amount:</span>
                    <span className="font-semibold text-green-600">${statistics.paidFeeAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outstanding:</span>
                    <span className="font-semibold text-red-600">
                      ${(statistics.totalFeeAmount - statistics.paidFeeAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Rate:</span>
                    <span className="font-semibold">
                      {statistics.totalFeeAmount > 0 
                        ? ((statistics.paidFeeAmount / statistics.totalFeeAmount) * 100).toFixed(1)
                        : 0
                      }%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Fee Payment Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {fees.map((fee, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {fee.year} - Sem {fee.semester}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${fee.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(fee.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            fee.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : fee.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {fee.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Score Trend</h3>
              <Line data={riskTrendData} options={chartOptions} />
            </div>

            {riskHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Risk Factor Breakdown</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(riskHistory[0].factors).map(([factor, value]) => {
                      const numericValue = Number(value);
                      return (
                        <div key={factor} className="text-center">
                          <p className="text-sm font-medium text-gray-600 capitalize">{factor}</p>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  numericValue > 0.6 ? 'bg-red-500' :
                                  numericValue > 0.3 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${numericValue * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-lg font-semibold mt-1">{(numericValue * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Risk Assessment History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Academic</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Financial</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engagement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {riskHistory.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.calculatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {(record.riskScore * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(record.riskLevel)}`}>
                            {record.riskLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(record.factors.attendance * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(record.factors.academic * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(record.factors.financial * 100).toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(record.factors.engagement * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}