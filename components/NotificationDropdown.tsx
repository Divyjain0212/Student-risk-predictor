'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Calendar,
  MessageCircle,
  Award,
  BookOpen,
  Clock
} from 'lucide-react'

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

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  // Mock notifications - in real app, these would come from an API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Assignment Due Tomorrow',
        message: 'Mathematics Assignment #5 is due tomorrow at 11:59 PM',
        type: 'reminder',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        actionUrl: '/student/assignments',
        priority: 'high'
      },
      {
        id: '2',
        title: 'New Achievement Unlocked!',
        message: 'Congratulations! You earned the "Study Streak" badge',
        type: 'achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        actionUrl: '/achievements',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Counseling Session Scheduled',
        message: 'Your counseling session is scheduled for tomorrow at 2:00 PM',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        actionUrl: '/student/counseling',
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Low Attendance Alert',
        message: 'Your attendance in Physics is below 75%. Please check your schedule.',
        type: 'alert',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: false,
        actionUrl: '/student/attendance-manager',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Test Results Available',
        message: 'Your Chemistry test results are now available to view',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        actionUrl: '/test-portal',
        priority: 'low'
      },
      {
        id: '6',
        title: 'New Study Material',
        message: 'New study materials have been uploaded for Computer Science',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
        actionUrl: '/student/academic-support',
        priority: 'low'
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'achievement': return <Award className="h-5 w-5 text-purple-600" />
      case 'reminder': return <Clock className="h-5 w-5 text-blue-600" />
      case 'info': return <Info className="h-5 w-5 text-blue-600" />
      default: return <MessageCircle className="h-5 w-5 text-gray-600" />
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

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    
    if (diff < 1000 * 60) return 'Just now'
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))} min ago`
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))} hr ago`
    if (diff < 1000 * 60 * 60 * 24 * 7) return `${Math.floor(diff / (1000 * 60 * 60 * 24))} day ago`
    return timestamp.toLocaleDateString()
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const sortedNotifications = [...notifications].sort((a, b) => {
    // Sort by read status first (unread first), then by timestamp (newest first)
    if (a.read !== b.read) return a.read ? 1 : -1
    return b.timestamp.getTime() - a.timestamp.getTime()
  })

  if (!isOpen) return null

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {formatTime(notification.timestamp)}
                          </p>
                          {notification.actionUrl && (
                            <button
                              onClick={() => {
                                markAsRead(notification.id)
                                window.location.href = notification.actionUrl!
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Mark as read"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete notification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={() => {
              onClose()
              window.location.href = '/notifications'
            }}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2"
          >
            View All Notifications
          </button>
        </div>
      )}
    </div>
  )
}