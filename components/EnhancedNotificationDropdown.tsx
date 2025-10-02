'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Award,
  Clock,
  Trash2,
  X,
  Settings,
  Eye,
  ExternalLink,
  Filter
} from 'lucide-react'
import { Button, Badge } from './ui/design-system'
import { cn } from '@/lib/utils'

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

interface EnhancedNotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function EnhancedNotificationDropdown({ isOpen, onClose }: EnhancedNotificationDropdownProps) {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Enhanced mock notifications with better variety
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Assignment Due Soon ⏰',
        message: 'Mathematics Assignment #5 is due tomorrow at 11:59 PM',
        type: 'reminder',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        actionUrl: '/student/assignments',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Achievement Unlocked! 🏆',
        message: 'Congratulations! You earned the "Study Streak" badge for 7 consecutive days',
        type: 'achievement',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        actionUrl: '/achievements',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Counseling Session Reminder',
        message: 'Your session with Dr. Smith is scheduled for tomorrow at 2:00 PM',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true,
        actionUrl: '/student/counseling',
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Attendance Alert ⚠️',
        message: 'Your Physics attendance is 72%, below the required 75%',
        type: 'alert',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: false,
        actionUrl: '/student/attendance-manager',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Test Results Available ✅',
        message: 'Your Chemistry test results are ready. Score: 87/100',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        read: true,
        actionUrl: '/test-portal',
        priority: 'low'
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setTimeout(() => setIsAnimating(false), 300)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getIcon = (type: Notification['type']) => {
    const iconClasses = "h-5 w-5"
    switch (type) {
      case 'success': 
        return <CheckCircle className={`${iconClasses} text-green-600`} />
      case 'warning': 
        return <AlertTriangle className={`${iconClasses} text-yellow-600`} />
      case 'alert': 
        return <AlertTriangle className={`${iconClasses} text-red-600`} />
      case 'achievement': 
        return <Award className={`${iconClasses} text-purple-600`} />
      case 'reminder': 
        return <Clock className={`${iconClasses} text-blue-600`} />
      case 'info': 
        return <Info className={`${iconClasses} text-blue-600`} />
      default: 
        return <Bell className={`${iconClasses} text-gray-600`} />
    }
  }

  const getNotificationBg = (type: Notification['type'], read: boolean) => {
    if (read) return "bg-white hover:bg-gray-50"
    
    switch (type) {
      case 'success': return "bg-green-50 hover:bg-green-100 border-l-4 border-green-400"
      case 'warning': return "bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-400"
      case 'alert': return "bg-red-50 hover:bg-red-100 border-l-4 border-red-400"
      case 'achievement': return "bg-purple-50 hover:bg-purple-100 border-l-4 border-purple-400"
      case 'reminder': return "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-400"
      default: return "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-400"
    }
  }

  const getPriorityIndicator = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      case 'medium':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full" />
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
    if (diff < 1000 * 60 * 60 * 24 * 7) return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`
    return timestamp.toLocaleDateString()
  }

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.read
  ).sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1
    return b.timestamp.getTime() - a.timestamp.getTime()
  })

  const unreadCount = notifications.filter(n => !n.read).length

  if (!isOpen && !isAnimating) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className={cn(
        "fixed top-20 right-4 w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 transition-all duration-300 transform-gpu",
        isOpen 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-2 scale-95 pointer-events-none"
      )}>
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-gray-500">{unreadCount} unread messages</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
                className="text-xs hover:bg-blue-50"
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter === 'all' ? 'Unread' : 'All'}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Mark All Read
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              >
                <Settings className="h-3 w-3 mr-1" />
                Settings
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[32rem] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="py-2">
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={cn(
                    "mx-3 mb-2 last:mb-0 p-4 rounded-xl cursor-pointer group relative transition-all duration-200",
                    getNotificationBg(notification.type, notification.read),
                    "hover:shadow-sm transform hover:-translate-y-0.5"
                  )}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                  }}
                  onClick={() => {
                    if (!notification.read) markAsRead(notification.id)
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl
                      onClose()
                    }
                  }}
                >
                  {/* Priority indicator */}
                  <div className="absolute top-3 right-3">
                    {getPriorityIndicator(notification.priority)}
                  </div>

                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform">
                      {getIcon(notification.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={cn(
                          "text-sm font-semibold group-hover:text-blue-600 transition-colors",
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        )}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1.5 animate-pulse" />
                        )}
                      </div>
                      
                      <p className={cn(
                        "text-sm mt-1 line-clamp-2",
                        notification.read ? 'text-gray-500' : 'text-gray-700'
                      )}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 font-medium">
                          {formatTime(notification.timestamp)}
                        </span>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                              className="h-6 px-2 text-xs hover:bg-blue-100 hover:text-blue-700"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Read
                            </Button>
                          )}
                          
                          {notification.actionUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-gray-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="h-6 px-2 text-xs text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">All caught up!</h3>
              <p className="text-sm text-gray-500">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 to-transparent border-t border-gray-100 px-6 py-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
              onClick={() => {
                window.location.href = '/notifications'
                onClose()
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Notifications
            </Button>
          </div>
        )}
      </div>
    </>
  )
}