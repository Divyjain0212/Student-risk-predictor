'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Users, 
  Search, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  TrendingDown,
  User,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  Target
} from 'lucide-react'

export default function MentorStudentsPage() {
  const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')

  const students = [
    {
      id: 1,
      name: 'John Doe',
      studentId: 'STU001',
      email: 'john.doe@college.edu',
      phone: '+1234567890',
      department: 'Computer Science',
      year: 'Second Year',
      gpa: 3.8,
      attendance: 95,
      riskLevel: 'low',
      lastSession: '2025-09-28',
      nextSession: '2025-10-05',
      progress: 'excellent',
      goals: ['Improve coding skills', 'Find internship'],
      achievements: ['Dean\'s List', 'Hackathon Winner']
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      studentId: 'STU002',
      email: 'sarah.wilson@college.edu',
      department: 'Mathematics',
      year: 'Third Year',
      gpa: 3.2,
      attendance: 78,
      riskLevel: 'medium',
      lastSession: '2025-09-25',
      nextSession: '2025-10-03',
      progress: 'improving',
      goals: ['Raise GPA', 'Better study habits'],
      achievements: ['Math Competition Participant']
    },
    {
      id: 3,
      name: 'Mike Johnson',
      studentId: 'STU003',
      email: 'mike.johnson@college.edu',
      phone: '+1987654321',
      department: 'Physics',
      year: 'First Year',
      gpa: 2.8,
      attendance: 65,
      riskLevel: 'high',
      lastSession: '2025-09-20',
      nextSession: '2025-10-08',
      progress: 'needs attention',
      goals: ['Improve attendance', 'Academic support'],
      achievements: []
    }
  ]

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <Clock className="h-4 w-4" />
      case 'low': return <CheckCircle className="h-4 w-4" />
      default: return null
    }
  }

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'excellent': return 'text-green-600'
      case 'improving': return 'text-blue-600'
      case 'needs attention': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getProgressIcon = (progress: string) => {
    switch (progress) {
      case 'excellent': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'improving': return <TrendingUp className="h-4 w-4 text-blue-600" />
      case 'needs attention': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return null
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    )
  }

  if (!session || (session.user as any).role !== 'mentor') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need mentor access to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
                <p className="text-gray-600">Monitor and support your assigned students</p>
              </div>
            </div>
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Risk</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => s.riskLevel === 'low').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Medium Risk</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => s.riskLevel === 'medium').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">High Risk</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => s.riskLevel === 'high').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Student Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.studentId}</p>
                      <p className="text-xs text-gray-400">{student.department} • {student.year}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                    {getRiskIcon(student.riskLevel)}
                    <span className="ml-1 capitalize">{student.riskLevel} Risk</span>
                  </span>
                </div>
              </div>

              {/* Student Stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">GPA</p>
                    <p className="text-xl font-semibold text-gray-900">{student.gpa}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Attendance</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.attendance >= 90 ? 'bg-green-500' :
                            student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.attendance}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-500">Progress</p>
                    <div className="flex items-center space-x-1">
                      {getProgressIcon(student.progress)}
                      <span className={`text-sm font-medium capitalize ${getProgressColor(student.progress)}`}>
                        {student.progress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Goals */}
                {student.goals.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Current Goals</p>
                    <div className="space-y-1">
                      {student.goals.slice(0, 2).map((goal, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Target className="h-3 w-3 text-blue-600" />
                          <span className="text-sm text-gray-600">{goal}</span>
                        </div>
                      ))}
                      {student.goals.length > 2 && (
                        <p className="text-xs text-gray-500">+{student.goals.length - 2} more goals</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {student.achievements.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Recent Achievements</p>
                    <div className="space-y-1">
                      {student.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-sm text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Session: {student.lastSession}</span>
                    <span className="text-gray-500">Next: {student.nextSession}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-3">
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Message</span>
                    </button>
                    <button className="flex items-center text-green-600 hover:text-green-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">Schedule</span>
                    </button>
                    {student.email && (
                      <button className="flex items-center text-purple-600 hover:text-purple-700">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="text-sm">Email</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}