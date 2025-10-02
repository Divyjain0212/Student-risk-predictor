'use client'

import React from 'react'
import { Card, Button, Badge, Progress } from '../ui/design-system'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  BarChart3,
  Target,
  Clock,
  Star,
  ArrowRight,
  Plus,
  Filter
} from 'lucide-react'

// =============================================
// STATS CARD COMPONENT
// =============================================

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  description?: string
  variant?: 'default' | 'glassmorphism' | 'gradient'
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon, 
  description,
  variant = 'default' 
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />
      case 'down': return <TrendingDown className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <Card 
      variant={variant} 
      hover="lift" 
      className="group relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <div className="text-white">
              {icon}
            </div>
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {value}
          </h3>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </Card>
  )
}

// =============================================
// PROGRESS CARD COMPONENT
// =============================================

interface ProgressCardProps {
  title: string
  progress: number
  target: number
  unit?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  icon: React.ReactNode
  timeframe?: string
}

export function ProgressCard({ 
  title, 
  progress, 
  target, 
  unit = '', 
  color = 'blue',
  icon,
  timeframe 
}: ProgressCardProps) {
  const percentage = Math.min((progress / target) * 100, 100)
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  }

  return (
    <Card variant="elevated" hover="glow" className="group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        {timeframe && (
          <Badge variant="secondary" size="sm">
            {timeframe}
          </Badge>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {progress}{unit}
            </span>
            <span className="text-sm text-gray-500">
              / {target}{unit}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{Math.round(percentage)}%</span>
          </div>
          <Progress 
            value={percentage} 
            variant={color === 'green' ? 'success' : color === 'orange' ? 'warning' : 'default'}
            animated
            showLabel={false}
          />
        </div>
      </div>
    </Card>
  )
}

// =============================================
// ACHIEVEMENT CARD COMPONENT
// =============================================

interface AchievementCardProps {
  title: string
  description: string
  progress: number
  total: number
  icon: React.ReactNode
  earned?: boolean
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

export function AchievementCard({ 
  title, 
  description, 
  progress, 
  total, 
  icon, 
  earned = false,
  rarity = 'common' 
}: AchievementCardProps) {
  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500', 
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-yellow-500'
  }

  const rarityBadges = {
    common: 'bg-gray-100 text-gray-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800', 
    legendary: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <Card 
      variant={earned ? "success" : "default"} 
      hover="lift"
      className={`group relative overflow-hidden ${earned ? 'ring-2 ring-green-200' : ''}`}
    >
      {earned && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Star className="h-3 w-3 text-white fill-current" />
          </div>
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className={`p-3 bg-gradient-to-br ${rarityColors[rarity]} rounded-xl shadow-lg ${
          earned ? 'animate-glow' : 'grayscale group-hover:grayscale-0 transition-all'
        }`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`text-lg font-semibold ${earned ? 'text-green-900' : 'text-gray-900'}`}>
              {title}
            </h3>
            <Badge 
              variant={rarity as any} 
              size="sm"
              className={rarityBadges[rarity]}
            >
              {rarity}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{progress}/{total}</span>
            </div>
            <Progress 
              value={(progress / total) * 100} 
              variant={earned ? "success" : "default"}
              size="sm"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

// =============================================
// QUICK ACTION CARD COMPONENT
// =============================================

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'default' | 'primary' | 'success' | 'warning'
  disabled?: boolean
}

export function QuickActionCard({ 
  title, 
  description, 
  icon, 
  href, 
  onClick, 
  variant = 'default',
  disabled = false 
}: QuickActionCardProps) {
  const variantClasses = {
    default: 'hover:bg-gray-50 border-gray-200',
    primary: 'hover:bg-blue-50 border-blue-200 hover:border-blue-300',
    success: 'hover:bg-green-50 border-green-200 hover:border-green-300',
    warning: 'hover:bg-yellow-50 border-yellow-200 hover:border-yellow-300'
  }

  const content = (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${
          variant === 'primary' ? 'bg-blue-100 text-blue-600' :
          variant === 'success' ? 'bg-green-100 text-green-600' :
          variant === 'warning' ? 'bg-yellow-100 text-yellow-600' :
          'bg-gray-100 text-gray-600'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
    </div>
  )

  if (disabled) {
    return (
      <Card className="opacity-50 cursor-not-allowed">
        {content}
      </Card>
    )
  }

  if (href) {
    return (
      <Card 
        className={`group cursor-pointer transition-all duration-200 ${variantClasses[variant]}`}
        hover="lift"
      >
        <a href={href}>
          {content}
        </a>
      </Card>
    )
  }

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-200 ${variantClasses[variant]}`}
      hover="lift"
      onClick={onClick}
    >
      {content}
    </Card>
  )
}

// =============================================
// DASHBOARD HEADER COMPONENT
// =============================================

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumb?: Array<{ label: string; href?: string }>
}

export function DashboardHeader({ title, subtitle, actions, breadcrumb }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumb && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumb.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {item.href ? (
                  <a href={item.href} className="hover:text-gray-700 transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================
// ACTIVITY FEED COMPONENT
// =============================================

interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: Date
  type: 'achievement' | 'attendance' | 'grade' | 'assignment' | 'notification'
  icon?: React.ReactNode
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  limit?: number
}

export function ActivityFeed({ activities, limit = 5 }: ActivityFeedProps) {
  const limitedActivities = activities.slice(0, limit)

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'achievement': return <Award className="h-4 w-4 text-yellow-500" />
      case 'attendance': return <Calendar className="h-4 w-4 text-green-500" />
      case 'grade': return <BarChart3 className="h-4 w-4 text-blue-500" />
      case 'assignment': return <BookOpen className="h-4 w-4 text-purple-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    
    if (diff < 1000 * 60) return 'Just now'
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))} min ago`
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))} hr ago`
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))} day${Math.floor(diff / (1000 * 60 * 60 * 24)) > 1 ? 's' : ''} ago`
  }

  return (
    <Card variant="elevated" className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {limitedActivities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3 group">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              {activity.icon || getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
        
        {limitedActivities.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </Card>
  )
}

// =============================================
// EXPORTS
// =============================================

// All components are exported inline above