'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  BookOpen, 
  Brain, 
  Calculator, 
  Clock, 
  FileText, 
  GraduationCap, 
  Target,
  TrendingUp,
  Users,
  Video,
  Calendar,
  Download
} from 'lucide-react'

export default function AcademicSupportPage() {
  const { data: session, status } = useSession()
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500' },
    { id: 'science', name: 'Science', icon: Brain, color: 'bg-green-500' },
    { id: 'english', name: 'English', icon: BookOpen, color: 'bg-purple-500' },
    { id: 'computer', name: 'Computer Science', icon: Brain, color: 'bg-indigo-500' }
  ]

  const studyResources = [
    {
      id: 1,
      title: 'Linear Algebra Fundamentals',
      type: 'Video Tutorial',
      duration: '45 min',
      difficulty: 'Intermediate',
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Chemistry Lab Safety',
      type: 'Interactive Guide',
      duration: '30 min',
      difficulty: 'Beginner',
      subject: 'Science'
    },
    {
      id: 3,
      title: 'Essay Writing Techniques',
      type: 'Document',
      duration: '20 min',
      difficulty: 'Intermediate',
      subject: 'English'
    }
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Calculus Problem Set 3',
      subject: 'Mathematics',
      dueDate: '2025-10-05',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Chemistry Lab Report',
      subject: 'Science',
      dueDate: '2025-10-08',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Literature Analysis Essay',
      subject: 'English',
      dueDate: '2025-10-12',
      status: 'not-started'
    }
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading academic support...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Academic Support</h1>
              <p className="text-gray-600">Access study resources, tutorials, and academic guidance</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Subjects */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Select Subject</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((subject) => {
                    const IconComponent = subject.icon
                    return (
                      <button
                        key={subject.id}
                        onClick={() => setSelectedSubject(subject.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedSubject === subject.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium text-gray-900">{subject.name}</h3>
                            <p className="text-sm text-gray-500">Study materials & tutorials</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recommended Study Resources</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {studyResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {resource.type === 'Video Tutorial' && <Video className="h-5 w-5 text-blue-600" />}
                            {resource.type === 'Interactive Guide' && <Target className="h-5 w-5 text-blue-600" />}
                            {resource.type === 'Document' && <FileText className="h-5 w-5 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{resource.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {resource.duration}
                              </span>
                              <span>{resource.type}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {resource.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Access
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Study Tools */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Study Tools</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-8 w-8 text-purple-600" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Study Scheduler</h3>
                        <p className="text-sm text-gray-500">Plan your study sessions</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Progress Tracker</h3>
                        <p className="text-sm text-gray-500">Monitor your learning</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Study Groups</h3>
                        <p className="text-sm text-gray-500">Join collaborative sessions</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Download className="h-8 w-8 text-orange-600" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Resources</h3>
                        <p className="text-sm text-gray-500">Download materials</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-3 border border-gray-200 rounded-lg">
                      <h3 className="font-medium text-gray-900 text-sm">{assignment.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{assignment.subject}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          assignment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {assignment.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Request Tutor Help
                </button>
                <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                  Join Study Session
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  Academic Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}