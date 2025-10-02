'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Calendar,
  Users,
  MessageCircle,
  Clock,
  TrendingUp,
  Heart,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Phone,
  Video,
  Mail,
  Plus,
  Filter,
  Search,
  User,
  Home
} from 'lucide-react';

interface CounselingSession {
  _id: string;
  studentName: string;
  studentId: string;
  date: string;
  time: string;
  type: 'individual' | 'group' | 'crisis';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  topic: string;
  notes?: string;
  duration: number;
}

interface Student {
  _id: string;
  name: string;
  studentId: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastSession: string;
  totalSessions: number;
  issueCategories: string[];
  contactPreference: 'phone' | 'email' | 'video' | 'in-person';
}

interface DashboardStats {
  totalSessions: number;
  upcomingSessions: number;
  activeStudents: number;
  crisisInterventions: number;
  completionRate: number;
  averageSessionRating: number;
}

export default function CounselorDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalSessions: 0,
    upcomingSessions: 0,
    activeStudents: 0,
    crisisInterventions: 0,
    completionRate: 0,
    averageSessionRating: 0,
  });

  const [sessions, setSessions] = useState<CounselingSession[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<CounselingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sessions' | 'students' | 'reports'>('sessions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalSessions: 142,
      upcomingSessions: 8,
      activeStudents: 67,
      crisisInterventions: 12,
      completionRate: 89.5,
      averageSessionRating: 4.6,
    };

    const mockSessions: CounselingSession[] = [
      {
        _id: '1',
        studentName: 'John Doe',
        studentId: 'STU001',
        date: '2024-01-15',
        time: '10:00',
        type: 'individual',
        status: 'scheduled',
        topic: 'Academic Stress',
        duration: 60,
      },
      {
        _id: '2',
        studentName: 'Sarah Wilson',
        studentId: 'STU002',
        date: '2024-01-15',
        time: '14:00',
        type: 'individual',
        status: 'scheduled',
        topic: 'Financial Anxiety',
        duration: 45,
      },
      {
        _id: '3',
        studentName: 'Mike Johnson',
        studentId: 'STU003',
        date: '2024-01-14',
        time: '11:00',
        type: 'crisis',
        status: 'completed',
        topic: 'Mental Health Crisis',
        notes: 'Student showed significant improvement. Referred to additional resources.',
        duration: 90,
      },
      {
        _id: '4',
        studentName: 'Emily Chen',
        studentId: 'STU004',
        date: '2024-01-16',
        time: '09:00',
        type: 'group',
        status: 'scheduled',
        topic: 'Study Skills Workshop',
        duration: 120,
      },
    ];

    const mockStudents: Student[] = [
      {
        _id: '1',
        name: 'John Doe',
        studentId: 'STU001',
        department: 'Computer Science',
        riskLevel: 'high',
        lastSession: '2024-01-10',
        totalSessions: 5,
        issueCategories: ['Academic Stress', 'Time Management'],
        contactPreference: 'email',
      },
      {
        _id: '2',
        name: 'Sarah Wilson',
        studentId: 'STU002',
        department: 'Mathematics',
        riskLevel: 'medium',
        lastSession: '2024-01-08',
        totalSessions: 3,
        issueCategories: ['Financial Anxiety', 'Social Issues'],
        contactPreference: 'phone',
      },
      {
        _id: '3',
        name: 'Mike Johnson',
        studentId: 'STU003',
        department: 'Physics',
        riskLevel: 'critical',
        lastSession: '2024-01-14',
        totalSessions: 8,
        issueCategories: ['Depression', 'Academic Stress', 'Family Issues'],
        contactPreference: 'in-person',
      },
    ];

    setTimeout(() => {
      setStats(mockStats);
      setSessions(mockSessions);
      setStudents(mockStudents);
      setFilteredSessions(mockSessions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter sessions based on search and status
  useEffect(() => {
    let filtered = sessions;

    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter);
    }

    setFilteredSessions(filtered);
  }, [sessions, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'no-show': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'text-purple-600 bg-purple-100';
      case 'group': return 'text-indigo-600 bg-indigo-100';
      case 'crisis': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counselor dashboard...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Counselor Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {session?.user?.name}
              </p>
            </div>
            <button
              onClick={() => setShowNewSessionModal(true)}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Crisis Interventions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.crisisInterventions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Heart className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageSessionRating}/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('sessions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sessions'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Sessions
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Students
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="h-4 w-4 inline mr-2" />
                Reports
              </button>
            </nav>
          </div>

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search sessions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  Showing {filteredSessions.length} of {sessions.length} sessions
                </div>
              </div>

              {/* Sessions List */}
              <div className="space-y-4">
                {filteredSessions.map((session) => (
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

              {filteredSessions.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="p-6">
              <div className="grid gap-6">
                {students.map((student) => (
                  <div key={student._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.studentId} • {student.department}</p>
                        </div>
                      </div>
                      
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(student.riskLevel)}`}>
                        {student.riskLevel} risk
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Last Session:</span>
                        <p className="text-gray-900">{student.lastSession}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Total Sessions:</span>
                        <p className="text-gray-900">{student.totalSessions}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Contact Preference:</span>
                        <p className="text-gray-900 capitalize">{student.contactPreference}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Issues:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.issueCategories.map((issue, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              {issue}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="p-6">
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Reports Coming Soon</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Advanced reporting and analytics features will be available soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}