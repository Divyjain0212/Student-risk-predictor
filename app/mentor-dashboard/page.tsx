'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  User,
  Video,
  Phone,
  Mail,
  Plus,
  Star,
  Target,
  BarChart3,
  Home
} from 'lucide-react';

interface MenteeStudent {
  _id: string;
  name: string;
  studentId: string;
  department: string;
  semester: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  academicScore: number;
  attendance: number;
  lastMeeting: string;
  nextMeeting: string;
  goals: string[];
  achievements: number;
  issues: string[];
}

interface MentoringSession {
  _id: string;
  studentName: string;
  studentId: string;
  date: string;
  time: string;
  type: 'academic' | 'career' | 'personal' | 'project';
  status: 'scheduled' | 'completed' | 'cancelled';
  topic: string;
  duration: number;
  notes?: string;
}

interface DashboardStats {
  totalMentees: number;
  upcomingSessions: number;
  completedSessions: number;
  averageProgress: number;
  achievementsUnlocked: number;
  responseRate: number;
}

export default function MentorDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalMentees: 0,
    upcomingSessions: 0,
    completedSessions: 0,
    averageProgress: 0,
    achievementsUnlocked: 0,
    responseRate: 0,
  });

  const [mentees, setMentees] = useState<MenteeStudent[]>([]);
  const [sessions, setSessions] = useState<MentoringSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mentees' | 'sessions' | 'progress'>('mentees');

  // Mock data for demonstration
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalMentees: 15,
      upcomingSessions: 5,
      completedSessions: 47,
      averageProgress: 78.5,
      achievementsUnlocked: 23,
      responseRate: 94.2,
    };

    const mockMentees: MenteeStudent[] = [
      {
        _id: '1',
        name: 'John Doe',
        studentId: 'STU001',
        department: 'Computer Science',
        semester: 6,
        riskLevel: 'high',
        academicScore: 6.2,
        attendance: 65,
        lastMeeting: '2024-01-10',
        nextMeeting: '2024-01-17',
        goals: ['Improve Programming Skills', 'Complete Final Project', 'Find Internship'],
        achievements: 5,
        issues: ['Time Management', 'Academic Stress'],
      },
      {
        _id: '2',
        name: 'Sarah Wilson',
        studentId: 'STU002',
        department: 'Computer Science',
        semester: 4,
        riskLevel: 'medium',
        academicScore: 7.8,
        attendance: 82,
        lastMeeting: '2024-01-12',
        nextMeeting: '2024-01-19',
        goals: ['Learn Web Development', 'Build Portfolio', 'Networking'],
        achievements: 12,
        issues: ['Career Guidance'],
      },
      {
        _id: '3',
        name: 'Mike Johnson',
        studentId: 'STU003',
        department: 'Computer Science',
        semester: 8,
        riskLevel: 'critical',
        academicScore: 4.5,
        attendance: 45,
        lastMeeting: '2024-01-08',
        nextMeeting: '2024-01-15',
        goals: ['Graduate on Time', 'Improve GPA', 'Job Preparation'],
        achievements: 2,
        issues: ['Academic Performance', 'Attendance', 'Motivation'],
      },
      {
        _id: '4',
        name: 'Emily Chen',
        studentId: 'STU004',
        department: 'Computer Science',
        semester: 2,
        riskLevel: 'low',
        academicScore: 9.1,
        attendance: 95,
        lastMeeting: '2024-01-11',
        nextMeeting: '2024-01-18',
        goals: ['Explore Research Opportunities', 'Join Coding Club', 'Maintain Excellence'],
        achievements: 18,
        issues: [],
      },
    ];

    const mockSessions: MentoringSession[] = [
      {
        _id: '1',
        studentName: 'John Doe',
        studentId: 'STU001',
        date: '2024-01-17',
        time: '10:00',
        type: 'academic',
        status: 'scheduled',
        topic: 'Project Planning and Time Management',
        duration: 60,
      },
      {
        _id: '2',
        studentName: 'Sarah Wilson',
        studentId: 'STU002',
        date: '2024-01-19',
        time: '14:00',
        type: 'career',
        status: 'scheduled',
        topic: 'Portfolio Review and Career Planning',
        duration: 45,
      },
      {
        _id: '3',
        studentName: 'Mike Johnson',
        studentId: 'STU003',
        date: '2024-01-15',
        time: '11:00',
        type: 'personal',
        status: 'scheduled',
        topic: 'Motivation and Study Strategies',
        duration: 60,
      },
    ];

    setTimeout(() => {
      setStats(mockStats);
      setMentees(mockMentees);
      setSessions(mockSessions);
      setLoading(false);
    }, 1000);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'career': return 'text-purple-600 bg-purple-100';
      case 'personal': return 'text-green-600 bg-green-100';
      case 'project': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentor dashboard...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {session?.user?.name}
              </p>
            </div>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Mentees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMentees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Achievements Unlocked</p>
                <p className="text-2xl font-bold text-gray-900">{stats.achievementsUnlocked}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('mentees')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'mentees'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                My Mentees
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sessions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Sessions
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'progress'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Progress
              </button>
            </nav>
          </div>

          {/* Mentees Tab */}
          {activeTab === 'mentees' && (
            <div className="p-6">
              <div className="grid gap-6">
                {mentees.map((mentee) => (
                  <div key={mentee._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{mentee.name}</h3>
                          <p className="text-sm text-gray-600">
                            {mentee.studentId} • {mentee.department} • Semester {mentee.semester}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(mentee.riskLevel)}`}>
                          {mentee.riskLevel} risk
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{mentee.achievements}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{mentee.academicScore}/10</p>
                        <p className="text-xs text-gray-600">Academic Score</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{mentee.attendance}%</p>
                        <p className="text-xs text-gray-600">Attendance</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{mentee.lastMeeting}</p>
                        <p className="text-xs text-gray-600">Last Meeting</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{mentee.nextMeeting}</p>
                        <p className="text-xs text-gray-600">Next Meeting</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Goals</h4>
                        <div className="space-y-1">
                          {mentee.goals.map((goal, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Target className="h-3 w-3 text-blue-500" />
                              <span className="text-sm text-gray-600">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Areas of Focus</h4>
                        <div className="flex flex-wrap gap-1">
                          {mentee.issues.length > 0 ? (
                            mentee.issues.map((issue, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                {issue}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-green-600">No issues identified</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                      <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                        <Video className="h-4 w-4 mr-1" />
                        Video Call
                      </button>
                      <button className="flex items-center px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </button>
                      <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="p-6">
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {session.studentName}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(session.type)}`}>
                            {session.type}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Student ID:</span> {session.studentId}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {session.date}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {session.time}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {session.duration} min
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Topic:</span> {session.topic}
                          </p>
                          {session.notes && (
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Notes:</span> {session.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                          <Video className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-100 rounded">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Progress Analytics Coming Soon</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Detailed progress tracking and analytics for your mentees will be available soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}