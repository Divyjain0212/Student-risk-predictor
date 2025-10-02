'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  DollarSign,
  MessageSquare,
  Award,
  BookOpen,
  Settings,
  Download,
  Filter,
  Search,
  Eye,
  UserCheck,
  UserX,
  Heart,
  GraduationCap,
  Building,
  Home
} from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  attendance: number;
  academicScore: number;
  financialNeed: number;
  lastActive: string;
  interventions: number;
  counselingSessions: number;
  achievements: number;
}

interface DashboardStats {
  totalStudents: number;
  highRiskStudents: number;
  activeInterventions: number;
  averageAttendance: number;
  financialAidRequests: number;
  counselingSessions: number;
  totalAchievements: number;
  monthlyEngagement: number;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    highRiskStudents: 0,
    activeInterventions: 0,
    averageAttendance: 0,
    financialAidRequests: 0,
    counselingSessions: 0,
    totalAchievements: 0,
    monthlyEngagement: 0,
  });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalStudents: 1250,
      highRiskStudents: 89,
      activeInterventions: 45,
      averageAttendance: 78.5,
      financialAidRequests: 156,
      counselingSessions: 203,
      totalAchievements: 847,
      monthlyEngagement: 92.3,
    };

    const mockStudents: Student[] = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john.doe@college.edu',
        studentId: 'STU001',
        department: 'Computer Science',
        riskLevel: 'high',
        attendance: 65,
        academicScore: 6.2,
        financialNeed: 8,
        lastActive: '2024-01-10',
        interventions: 3,
        counselingSessions: 2,
        achievements: 5,
      },
      {
        _id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@college.edu',
        studentId: 'STU002',
        department: 'Mathematics',
        riskLevel: 'medium',
        attendance: 82,
        academicScore: 7.8,
        financialNeed: 6,
        lastActive: '2024-01-12',
        interventions: 1,
        counselingSessions: 1,
        achievements: 12,
      },
      {
        _id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@college.edu',
        studentId: 'STU003',
        department: 'Physics',
        riskLevel: 'critical',
        attendance: 45,
        academicScore: 4.5,
        financialNeed: 9,
        lastActive: '2024-01-08',
        interventions: 5,
        counselingSessions: 4,
        achievements: 2,
      },
      {
        _id: '4',
        name: 'Emily Chen',
        email: 'emily.chen@college.edu',
        studentId: 'STU004',
        department: 'Computer Science',
        riskLevel: 'low',
        attendance: 95,
        academicScore: 9.1,
        financialNeed: 3,
        lastActive: '2024-01-12',
        interventions: 0,
        counselingSessions: 0,
        achievements: 18,
      },
    ];

    setTimeout(() => {
      setStats(mockStats);
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter students based on search term, risk level, and department
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter(student => student.riskLevel === riskFilter);
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(student => student.department === departmentFilter);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, riskFilter, departmentFilter]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['Name', 'Student ID', 'Department', 'Risk Level', 'Attendance', 'Academic Score', 'Financial Need'].join(','),
      ...filteredStudents.map(student =>
        [student.name, student.studentId, student.department, student.riskLevel, student.attendance, student.academicScore, student.financialNeed].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const forwardToGovernment = async (studentId: string) => {
    // Mock API call to forward student data to government support system
    console.log(`Forwarding student ${studentId} data to government support system`);
    alert('Student data forwarded to government support system successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {session?.user?.name}
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Risk Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highRiskStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageAttendance}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Counseling Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.counselingSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Financial Aid Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.financialAidRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Interventions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeInterventions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Award className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAchievements}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Engagement</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlyEngagement}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
                <option value="critical">Critical Risk</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Student Management</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Academic Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interventions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.studentId} • {student.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(student.riskLevel)}`}>
                        {student.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.attendance}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.academicScore}/10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.interventions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => forwardToGovernment(student._id)}
                        className="text-green-600 hover:text-green-800"
                        title="Forward to Government Support"
                      >
                        <Building className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-800">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <UserX className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}