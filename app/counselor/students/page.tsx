'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Users, 
  Search, 
  MessageCircle, 
  Calendar,
  Heart,
  Brain,
  User,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react'

export default function CounselorStudentsPage() {
  const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const students = [
    {
      id: 1,
      name: 'John Doe',
      studentId: 'STU001',
      email: 'john.doe@college.edu',
      phone: '+1234567890',
      department: 'Computer Science',
      year: 'Second Year',
      riskLevel: 'medium',
      category: 'Academic Stress',
      priority: 'medium',
      lastSession: '2025-09-28',
      nextSession: '2025-10-05',
      totalSessions: 3,
      progress: 'improving',
      currentIssues: ['Exam anxiety', 'Time management'],
      wellnessScore: 75,
      notes: 'Student showing improvement in stress management techniques'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      studentId: 'STU002',
      email: 'sarah.wilson@college.edu',
      department: 'Mathematics',
      year: 'Third Year',
      riskLevel: 'low',
      category: 'Career Guidance',
      priority: 'low',
      lastSession: '2025-09-25',
      nextSession: '2025-10-15',
      totalSessions: 1,
      progress: 'stable',
      currentIssues: ['Career uncertainty'],
      wellnessScore: 85,
      notes: 'One-time consultation for career planning'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      studentId: 'STU003',
      email: 'mike.johnson@college.edu',
      phone: '+1987654321',
      department: 'Physics',
      year: 'First Year',
      riskLevel: 'high',
      category: 'Personal Issues',
      priority: 'high',
      lastSession: '2025-09-30',
      nextSession: '2025-10-03',
      totalSessions: 5,
      progress: 'needs attention',
      currentIssues: ['Family stress', 'Financial concerns', 'Academic performance'],
      wellnessScore: 45,
      notes: 'Ongoing crisis intervention. Requires frequent monitoring.'
    },
    {
      id: 4,
      name: 'Emily Chen',
      studentId: 'STU004',
      email: 'emily.chen@college.edu',
      department: 'Computer Science',
      year: 'Second Year',
      riskLevel: 'medium',
      category: 'Social Anxiety',
      priority: 'medium',
      lastSession: '2025-09-26',
      nextSession: '2025-10-10',
      totalSessions: 2,
      progress: 'improving',
      currentIssues: ['Social interactions', 'Group work anxiety'],
      wellnessScore: 70,
      notes: 'Working on social skills development and confidence building'
    }
  ]

  const categories = ['Academic Stress', 'Personal Issues', 'Social Anxiety', 'Career Guidance', 'Mental Health']

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || student.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'improving': return 'text-green-600'
      case 'stable': return 'text-blue-600'
      case 'needs attention': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getProgressIcon = (progress: string) => {
    switch (progress) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'stable': return <Activity className="h-4 w-4 text-blue-600" />
      case 'needs attention': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return null
    }
  }

  const getWellnessColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic Stress': return <Brain className="h-4 w-4" />
      case 'Personal Issues': return <Heart className="h-4 w-4" />
      case 'Social Anxiety': return <Users className="h-4 w-4" />
      case 'Career Guidance': return <CheckCircle className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    )
  }

  if (!session || (session.user as any).role !== 'counselor') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need counselor access to view this page.</p>
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
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
                <p className="text-gray-600">Monitor student wellbeing and counseling progress</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-600" />
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

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Needs Attention</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => s.progress === 'needs attention').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Improving</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.filter(s => s.progress === 'improving').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.reduce((sum, s) => sum + s.totalSessions, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Student Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.studentId} • {student.department}</p>
                      <p className="text-xs text-gray-400">{student.year}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                      <span className="capitalize">{student.riskLevel} Risk</span>
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(student.priority)}`}>
                      <span className="capitalize">{student.priority} Priority</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="p-6 space-y-4">
                {/* Category and Progress */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(student.category)}
                    <span className="text-sm font-medium text-gray-700">{student.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getProgressIcon(student.progress)}
                    <span className={`text-sm font-medium capitalize ${getProgressColor(student.progress)}`}>
                      {student.progress}
                    </span>
                  </div>
                </div>

                {/* Wellness Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Wellness Score</span>
                    <span className={`text-sm font-semibold ${getWellnessColor(student.wellnessScore)}`}>
                      {student.wellnessScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        student.wellnessScore >= 80 ? 'bg-green-500' :
                        student.wellnessScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${student.wellnessScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                    <p className="text-lg font-semibold text-gray-900">{student.totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Next Session</p>
                    <p className="text-sm text-gray-900">{student.nextSession}</p>
                  </div>
                </div>

                {/* Current Issues */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Current Issues</p>
                  <div className="flex flex-wrap gap-1">
                    {student.currentIssues.slice(0, 3).map((issue, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        {issue}
                      </span>
                    ))}
                    {student.currentIssues.length > 3 && (
                      <span className="text-xs text-gray-500">+{student.currentIssues.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {student.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Latest Notes</p>
                    <p className="text-sm text-gray-600">{student.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Last Session: {student.lastSession}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center text-green-600 hover:text-green-700">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">New Session</span>
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <FileText className="h-4 w-4 mr-1" />
                      <span className="text-sm">View Notes</span>
                    </button>
                    <button className="flex items-center text-purple-600 hover:text-purple-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">Schedule</span>
                    </button>
                    {student.email && (
                      <button className="flex items-center text-orange-600 hover:text-orange-700">
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
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}