'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Award,
  Clock,
  Trash2,
  Filter,
  ArrowLeft
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PageLoader } from '../../components/LoadingSpinner'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'achievement' | 'reminder' | 'alert'
  timestamp: Date
  read: boolean
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
}

export default function NotificationsPage() {
  const { data: session, status } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all')
  const router = useRouter()

  useEffect(() => {
    // Extended mock notifications for the full page
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Assignment Due Tomorrow',
        message: 'Mathematics Assignment #5 is due tomorrow at 11:59 PM. Don\'t forget to submit!',
        type: 'reminder',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        actionUrl: '/student/assignments',
        priority: 'high'
      },
      {
        id: '2',
        title: 'New Achievement Unlocked!',
        message: 'Congratulations! You earned the "Study Streak" badge for studying 7 days in a row.',
        type: 'achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        actionUrl: '/achievements',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Counseling Session Scheduled',
        message: 'Your counseling session with Dr. Smith is scheduled for tomorrow at 2:00 PM in Room 205.',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true,
        actionUrl: '/student/counseling',
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Low Attendance Alert',
        message: 'Your attendance in Physics is 72%, which is below the required 75%. Please attend upcoming classes.',
        type: 'alert',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: false,
        actionUrl: '/student/attendance-manager',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Test Results Available',
        message: 'Your Chemistry test results are now available. You scored 87/100 - Great job!',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        read: true,
        actionUrl: '/test-portal',
        priority: 'low'
      },
      {
        id: '6',
        title: 'New Study Material Added',
        message: 'New study materials for Computer Science Chapter 5 have been uploaded to your course.',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        read: true,
        actionUrl: '/student/academic-support',
        priority: 'low'
      },
      {
        id: '7',
        title: 'Scholarship Application Deadline',
        message: 'Reminder: Merit scholarship applications are due in 5 days. Apply now!',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        read: false,
        actionUrl: '/student/financial-support',
        priority: 'high'
      },
      {
        id: '8',
        title: 'Library Book Due',
        message: 'Your library book "Advanced Mathematics" is due in 2 days. Please return or renew.',
        type: 'reminder',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        read: true,
        actionUrl: '/library',
        priority: 'medium'
      },
      {
        id: '9',
        title: 'Grade Improvement Opportunity',
        message: 'You can improve your English grade by completing the extra credit assignment by Friday.',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
        read: false,
        actionUrl: '/student/assignments',
        priority: 'medium'
      },
      {
        id: '10',
        title: 'Perfect Attendance Month!',
        message: 'Congratulations! You had perfect attendance last month. Keep up the great work!',
        type: 'achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        read: true,
        actionUrl: '/achievements',
        priority: 'low'
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-6 w-6 text-green-600" />
      case 'warning': return <AlertTriangle className="h-6 w-6 text-yellow-600" />
      case 'alert': return <AlertTriangle className="h-6 w-6 text-red-600" />
      case 'achievement': return <Award className="h-6 w-6 text-purple-600" />
      case 'reminder': return <Clock className="h-6 w-6 text-blue-600" />
      case 'info': return <Info className="h-6 w-6 text-blue-600" />
      default: return <Bell className="h-6 w-6 text-gray-600" />
    }
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'alert': return 'bg-red-50 border-red-200'
      case 'achievement': return 'bg-purple-50 border-purple-200'
      case 'reminder': return 'bg-blue-50 border-blue-200'
      case 'info': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notif => !notif.read))
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    
    if (diff < 1000 * 60) return 'Just now'
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))} minutes ago`
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))} hours ago`
    if (diff < 1000 * 60 * 60 * 24 * 7) return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`
    return timestamp.toLocaleDateString()
  }

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read
      case 'important': return notification.priority === 'high'
      default: return true
    }
  }).sort((a, b) => {
    // Sort by read status first (unread first), then by timestamp (newest first)
    if (a.read !== b.read) return a.read ? 1 : -1
    return b.timestamp.getTime() - a.timestamp.getTime()
  })

  const unreadCount = notifications.filter(n => !n.read).length

  if (status === 'loading') {
    return <PageLoader />
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your notifications.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="important">Important</option>
              </select>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark All Read
                </button>
              )}
              
              <button
                onClick={deleteAllRead}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear Read
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'unread' ? 'No unread notifications' : 
                 filter === 'important' ? 'No important notifications' : 
                 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md ${
                  !notification.read ? 'ring-2 ring-blue-100' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          {notification.priority === 'high' && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                              Important
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {formatTime(notification.timestamp)}
                          </p>
                          
                          <div className="flex items-center space-x-3">
                            {notification.actionUrl && (
                              <button
                                onClick={() => {
                                  markAsRead(notification.id)
                                  router.push(notification.actionUrl!)
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Take Action
                              </button>
                            )}
                            
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-sm text-gray-600 hover:text-gray-800"
                              >
                                Mark as Read
                              </button>
                            )}
                            
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-600 p-1"
                              title="Delete notification"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {notifications.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {notifications.filter(n => n.priority === 'high').length}
                </p>
                <p className="text-sm text-gray-600">Important</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {notifications.filter(n => n.read).length}
                </p>
                <p className="text-sm text-gray-600">Read</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}