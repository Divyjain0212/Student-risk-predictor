'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  MessageCircle, 
  Plus, 
  Calendar, 
  Clock, 
  User,
  Search,
  Filter,
  Video,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Heart,
  Brain,
  Users as UsersIcon
} from 'lucide-react'

export default function CounselorSessionsPage() {
  const { data: session, status } = useSession()
  const [showNewSessionModal, setShowNewSessionModal] = useState(false)
  
  const sessions = [
    {
      id: 1,
      student: 'John Doe',
      studentId: 'STU001',
      date: '2025-10-05',
      time: '10:00 AM',
      duration: '50 min',
      type: 'video',
      status: 'scheduled',
      category: 'Academic Stress',
      priority: 'medium',
      notes: 'Student experiencing exam anxiety',
      sessionNumber: 3
    },
    {
      id: 2,
      student: 'Sarah Wilson',
      studentId: 'STU002',
      date: '2025-10-03',
      time: '2:00 PM',
      duration: '45 min',
      type: 'in-person',
      status: 'completed',
      category: 'Career Guidance',
      priority: 'low',
      notes: 'Discussed career path options',
      sessionNumber: 1
    },
    {
      id: 3,
      student: 'Mike Johnson',
      studentId: 'STU003',
      date: '2025-10-08',
      time: '11:30 AM',
      duration: '60 min',
      type: 'video',
      status: 'pending',
      category: 'Personal Issues',
      priority: 'high',
      notes: 'Crisis intervention - family issues affecting studies',
      sessionNumber: 5
    },
    {
      id: 4,
      student: 'Emily Chen',
      studentId: 'STU004',
      date: '2025-10-10',
      time: '3:00 PM',
      duration: '45 min',
      type: 'phone',
      status: 'scheduled',
      category: 'Social Anxiety',
      priority: 'medium',
      notes: 'Follow-up session on social skills development',
      sessionNumber: 2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic Stress': return <Brain className="h-4 w-4" />
      case 'Personal Issues': return <Heart className="h-4 w-4" />
      case 'Social Anxiety': return <UsersIcon className="h-4 w-4" />
      case 'Career Guidance': return <CheckCircle className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sessions...</p>
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
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Counseling Sessions</h1>
                <p className="text-gray-600">Manage student counseling and support sessions</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewSessionModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                <p className="text-2xl font-semibold text-gray-900">{sessions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {sessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scheduled</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {sessions.filter(s => s.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {sessions.filter(s => s.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(sessions.map(s => s.studentId)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Counseling Sessions</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">All Categories</option>
                  <option value="academic">Academic Stress</option>
                  <option value="personal">Personal Issues</option>
                  <option value="social">Social Anxiety</option>
                  <option value="career">Career Guidance</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">All Priority</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{session.student}</h3>
                        <span className="text-sm text-gray-500">Session #{session.sessionNumber}</span>
                      </div>
                      <p className="text-sm text-gray-500">Student ID: {session.studentId}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getCategoryIcon(session.category)}
                        <span className="text-sm text-gray-600">{session.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{session.date}</p>
                      <p className="text-sm text-gray-500">{session.time}</p>
                      <p className="text-xs text-gray-400">{session.duration}</p>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        <span className="capitalize">{session.status}</span>
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(session.priority)}`}>
                        <span className="capitalize">{session.priority} Priority</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {session.type === 'video' && <Video className="h-5 w-5 text-purple-600" />}
                      {session.type === 'phone' && <Phone className="h-5 w-5 text-green-600" />}
                      {session.type === 'in-person' && <User className="h-5 w-5 text-blue-600" />}
                      {session.type === 'email' && <Mail className="h-5 w-5 text-orange-600" />}
                    </div>

                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View Details
                      </button>
                      {session.status === 'scheduled' && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Start Session
                        </button>
                      )}
                      {session.status === 'pending' && (
                        <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {session.notes && (
                  <div className="mt-3 ml-16">
                    <p className="text-sm text-gray-600">
                      <strong>Session Notes:</strong> {session.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50">
              <Plus className="h-5 w-5 mr-2" />
              Emergency Session
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50">
              <Calendar className="h-5 w-5 mr-2" />
              View Calendar
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50">
              <Brain className="h-5 w-5 mr-2" />
              Assessment Tools
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <UsersIcon className="h-5 w-5 mr-2" />
              Group Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}