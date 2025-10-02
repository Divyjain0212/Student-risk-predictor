'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Clock, 
  Users, 
  Trophy, 
  BookOpen,
  CheckCircle,
  XCircle,
  Timer,
  Award,
  Target,
  Brain,
  Star,
  TrendingUp
} from 'lucide-react'
import { PageLoader } from '../../components/LoadingSpinner'

interface Test {
  id: string
  title: string
  subject: string
  duration: number // in minutes
  questions: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  attempts: number
  bestScore?: number
  lastAttempt?: string
  description: string
  tags: string[]
}

interface TestResult {
  id: string
  testId: string
  score: number
  totalQuestions: number
  timeSpent: number
  date: string
  answers: any[]
}

export default function TestPortal() {
  const { data: session, status } = useSession()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const categories = ['Mathematics', 'Science', 'English', 'Computer Science', 'General Knowledge']

  const availableTests: Test[] = [
    {
      id: '1',
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      duration: 30,
      questions: 20,
      difficulty: 'Easy',
      attempts: 3,
      bestScore: 85,
      lastAttempt: '2024-10-01',
      description: 'Test your understanding of basic algebraic concepts, equations, and problem-solving techniques.',
      tags: ['algebra', 'equations', 'basic-math']
    },
    {
      id: '2',
      title: 'Physics: Motion & Forces',
      subject: 'Science',
      duration: 45,
      questions: 25,
      difficulty: 'Medium',
      attempts: 1,
      bestScore: 72,
      lastAttempt: '2024-09-28',
      description: 'Comprehensive test covering Newton\'s laws, motion equations, and force calculations.',
      tags: ['physics', 'mechanics', 'forces']
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      subject: 'Computer Science',
      duration: 60,
      questions: 30,
      difficulty: 'Hard',
      attempts: 0,
      description: 'Advanced test on data structures, algorithms, time complexity, and problem-solving patterns.',
      tags: ['algorithms', 'data-structures', 'programming']
    },
    {
      id: '4',
      title: 'English Grammar & Composition',
      subject: 'English',
      duration: 40,
      questions: 35,
      difficulty: 'Medium',
      attempts: 2,
      bestScore: 91,
      lastAttempt: '2024-09-30',
      description: 'Test your grammar knowledge, sentence structure, and writing composition skills.',
      tags: ['grammar', 'writing', 'composition']
    },
    {
      id: '5',
      title: 'World History Quiz',
      subject: 'General Knowledge',
      duration: 25,
      questions: 20,
      difficulty: 'Easy',
      attempts: 1,
      bestScore: 78,
      lastAttempt: '2024-09-25',
      description: 'General knowledge test covering major historical events, figures, and civilizations.',
      tags: ['history', 'world-events', 'general-knowledge']
    },
    {
      id: '6',
      title: 'Calculus Advanced Problems',
      subject: 'Mathematics',
      duration: 90,
      questions: 15,
      difficulty: 'Hard',
      attempts: 0,
      description: 'Challenging calculus problems including derivatives, integrals, and applications.',
      tags: ['calculus', 'advanced-math', 'derivatives']
    }
  ]

  const recentResults: TestResult[] = [
    {
      id: '1',
      testId: '1',
      score: 85,
      totalQuestions: 20,
      timeSpent: 28,
      date: '2024-10-01',
      answers: []
    },
    {
      id: '2',
      testId: '4',
      score: 91,
      totalQuestions: 35,
      timeSpent: 38,
      date: '2024-09-30',
      answers: []
    },
    {
      id: '3',
      testId: '2',
      score: 72,
      totalQuestions: 25,
      timeSpent: 43,
      date: '2024-09-28',
      answers: []
    }
  ]

  const filteredTests = availableTests.filter(test => {
    const matchesCategory = selectedCategory === 'all' || test.subject === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty
    return matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-yellow-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const stats = {
    totalTests: availableTests.length,
    completedTests: availableTests.filter(t => t.attempts > 0).length,
    averageScore: recentResults.reduce((sum, r) => sum + r.score, 0) / recentResults.length || 0,
    totalTimeSpent: recentResults.reduce((sum, r) => sum + r.timeSpent, 0)
  }

  if (status === 'loading') {
    return <PageLoader />
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access the Test Portal.</p>
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
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Test Portal</h1>
                <p className="text-gray-600">Practice tests and assessments to boost your knowledge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Tests</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTests}</p>
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
                <p className="text-2xl font-semibold text-gray-900">{stats.completedTests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Score</p>
                <p className="text-2xl font-semibold text-gray-900">{Math.round(stats.averageScore)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Time Spent</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTimeSpent}m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Tests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available Tests</h2>
                <div className="flex space-x-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Subjects</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTests.map((test) => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                            {test.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{test.subject}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Timer className="h-4 w-4" />
                            <span>{test.duration} mins</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-4 w-4" />
                            <span>{test.questions} questions</span>
                          </div>
                          {test.attempts > 0 && (
                            <div className="flex items-center space-x-1">
                              <Trophy className="h-4 w-4" />
                              <span className={getScoreColor(test.bestScore || 0)}>
                                Best: {test.bestScore}%
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {test.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-4 flex flex-col space-y-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                          {test.attempts > 0 ? 'Retake Test' : 'Start Test'}
                        </button>
                        {test.attempts > 0 && (
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                            View Results
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Results & Progress */}
          <div className="space-y-6">
            {/* Recent Results */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
              <div className="space-y-3">
                {recentResults.map((result) => {
                  const test = availableTests.find(t => t.id === result.testId)
                  return (
                    <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{test?.title}</p>
                        <p className="text-xs text-gray-500">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </p>
                        <p className="text-xs text-gray-500">{result.timeSpent}m</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Perfect Score</p>
                    <p className="text-xs text-gray-500">Score 100% on any test</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Consistent Performer</p>
                    <p className="text-xs text-gray-500">Complete 5 tests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Improving</p>
                    <p className="text-xs text-gray-500">Score higher on retakes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Test Taking Tips</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Read questions carefully before answering</li>
                <li>• Manage your time - don't spend too long on one question</li>
                <li>• Review your answers if time permits</li>
                <li>• Stay calm and trust your preparation</li>
                <li>• Learn from incorrect answers in previous attempts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}