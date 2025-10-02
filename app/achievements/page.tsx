'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Trophy, 
  Star, 
  Award, 
  Medal,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  Crown,
  Gem,
  Shield,
  Zap,
  Heart,
  Brain,
  Clock,
  Users,
  CheckCircle,
  Lock
} from 'lucide-react'
import { PageLoader } from '../../components/LoadingSpinner'

interface Achievement {
  id: string
  title: string
  description: string
  category: 'Academic' | 'Social' | 'Personal' | 'Special'
  icon: string
  color: string
  points: number
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  unlockedAt?: string
  progress?: number
  maxProgress?: number
  requirements: string[]
  isUnlocked: boolean
}

interface UserStats {
  totalPoints: number
  achievementsUnlocked: number
  currentStreak: number
  rank: string
  level: number
  nextLevelPoints: number
}

export default function Achievements() {
  const { data: session, status } = useSession()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const userStats: UserStats = {
    totalPoints: 2450,
    achievementsUnlocked: 12,
    currentStreak: 7,
    rank: 'Gold Scholar',
    level: 8,
    nextLevelPoints: 550
  }

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first assignment',
      category: 'Academic',
      icon: '🎯',
      color: 'bg-green-500',
      points: 50,
      rarity: 'Common',
      unlockedAt: '2024-09-01',
      requirements: ['Submit your first assignment'],
      isUnlocked: true
    },
    {
      id: '2',
      title: 'Perfect Score',
      description: 'Score 100% on any test',
      category: 'Academic',
      icon: '💯',
      color: 'bg-yellow-500',
      points: 200,
      rarity: 'Rare',
      unlockedAt: '2024-09-15',
      requirements: ['Score 100% on a test or quiz'],
      isUnlocked: true
    },
    {
      id: '3',
      title: 'Study Streak Master',
      description: 'Study for 30 consecutive days',
      category: 'Personal',
      icon: '🔥',
      color: 'bg-orange-500',
      points: 300,
      rarity: 'Epic',
      progress: 7,
      maxProgress: 30,
      requirements: ['Study for 30 days in a row'],
      isUnlocked: false
    },
    {
      id: '4',
      title: 'Knowledge Seeker',
      description: 'Complete 10 different tests',
      category: 'Academic',
      icon: '📚',
      color: 'bg-blue-500',
      points: 250,
      rarity: 'Rare',
      progress: 3,
      maxProgress: 10,
      requirements: ['Complete 10 different tests'],
      isUnlocked: false
    },
    {
      id: '5',
      title: 'Early Bird',
      description: 'Log in before 6 AM for 5 days',
      category: 'Personal',
      icon: '🌅',
      color: 'bg-purple-500',
      points: 150,
      rarity: 'Rare',
      unlockedAt: '2024-09-20',
      requirements: ['Log in before 6 AM for 5 consecutive days'],
      isUnlocked: true
    },
    {
      id: '6',
      title: 'Social Butterfly',
      description: 'Participate in 5 group discussions',
      category: 'Social',
      icon: '🦋',
      color: 'bg-pink-500',
      points: 175,
      rarity: 'Rare',
      progress: 2,
      maxProgress: 5,
      requirements: ['Participate in 5 different group discussions'],
      isUnlocked: false
    },
    {
      id: '7',
      title: 'Time Master',
      description: 'Complete all assignments on time for a month',
      category: 'Academic',
      icon: '⏰',
      color: 'bg-indigo-500',
      points: 400,
      rarity: 'Epic',
      unlockedAt: '2024-09-30',
      requirements: ['Submit all assignments on time for 30 days'],
      isUnlocked: true
    },
    {
      id: '8',
      title: 'Mentor Helper',
      description: 'Help 3 fellow students with their studies',
      category: 'Social',
      icon: '🤝',
      color: 'bg-green-600',
      points: 200,
      rarity: 'Rare',
      unlockedAt: '2024-09-25',
      requirements: ['Provide help to 3 different students'],
      isUnlocked: true
    },
    {
      id: '9',
      title: 'Wellness Warrior',
      description: 'Complete all wellness activities for a week',
      category: 'Personal',
      icon: '💪',
      color: 'bg-red-500',
      points: 175,
      rarity: 'Rare',
      progress: 4,
      maxProgress: 7,
      requirements: ['Complete daily wellness check-ins for 7 days'],
      isUnlocked: false
    },
    {
      id: '10',
      title: 'Scholar Supreme',
      description: 'Maintain 90%+ average for a semester',
      category: 'Academic',
      icon: '👑',
      color: 'bg-yellow-600',
      points: 1000,
      rarity: 'Legendary',
      progress: 85,
      maxProgress: 90,
      requirements: ['Maintain 90% average across all subjects for one semester'],
      isUnlocked: false
    },
    {
      id: '11',
      title: 'Night Owl',
      description: 'Study after 10 PM for 10 sessions',
      category: 'Personal',
      icon: '🦉',
      color: 'bg-purple-600',
      points: 125,
      rarity: 'Common',
      unlockedAt: '2024-09-18',
      requirements: ['Complete study sessions after 10 PM for 10 times'],
      isUnlocked: true
    },
    {
      id: '12',
      title: 'Attendance Champion',
      description: 'Perfect attendance for a month',
      category: 'Academic',
      icon: '🏆',
      color: 'bg-gold-500',
      points: 300,
      rarity: 'Epic',
      unlockedAt: '2024-09-10',
      requirements: ['Attend all classes for 30 consecutive days'],
      isUnlocked: true
    }
  ]

  const categories = ['Academic', 'Social', 'Personal', 'Special']

  const filteredAchievements = achievements.filter(achievement => {
    return selectedCategory === 'all' || achievement.category === selectedCategory
  })

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        if (a.isUnlocked && b.isUnlocked) {
          return new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime()
        }
        return a.isUnlocked ? -1 : b.isUnlocked ? 1 : 0
      case 'points':
        return b.points - a.points
      case 'rarity':
        const rarityOrder = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      case 'progress':
        if (!a.isUnlocked && !b.isUnlocked) {
          const progressA = a.progress && a.maxProgress ? (a.progress / a.maxProgress) * 100 : 0
          const progressB = b.progress && b.maxProgress ? (b.progress / b.maxProgress) * 100 : 0
          return progressB - progressA
        }
        return a.isUnlocked ? -1 : b.isUnlocked ? 1 : 0
      default:
        return 0
    }
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100'
      case 'Rare': return 'text-blue-600 bg-blue-100'
      case 'Epic': return 'text-purple-600 bg-purple-100'
      case 'Legendary': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic': return <BookOpen className="h-4 w-4" />
      case 'Social': return <Users className="h-4 w-4" />
      case 'Personal': return <Heart className="h-4 w-4" />
      case 'Special': return <Star className="h-4 w-4" />
      default: return <Trophy className="h-4 w-4" />
    }
  }

  const unlockedAchievements = achievements.filter(a => a.isUnlocked)
  const recentUnlocked = unlockedAchievements
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 3)

  if (status === 'loading') {
    return <PageLoader />
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your achievements.</p>
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
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
                <p className="text-gray-600">Track your progress and celebrate your milestones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Points</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.totalPoints.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-8 w-8 text-gold-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Unlocked</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.achievementsUnlocked}/{achievements.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Current Streak</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.currentStreak} days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Current Rank</p>
                <p className="text-lg font-semibold text-gray-900">{userStats.rank}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Level {userStats.level}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((userStats.totalPoints % 1000) / 1000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{userStats.nextLevelPoints} to next level</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Achievements */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">All Achievements</h2>
                <div className="flex space-x-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="recent">Recently Unlocked</option>
                    <option value="points">Points (High to Low)</option>
                    <option value="rarity">Rarity</option>
                    <option value="progress">Progress</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {sortedAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`border rounded-lg p-4 transition-all ${
                      achievement.isUnlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-lg ${achievement.color} flex items-center justify-center text-2xl relative`}>
                        {achievement.isUnlocked ? (
                          <span>{achievement.icon}</span>
                        ) : (
                          <Lock className="h-8 w-8 text-white" />
                        )}
                        {achievement.isUnlocked && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        
                        <p className={`text-sm mb-2 ${achievement.isUnlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            {getCategoryIcon(achievement.category)}
                            <span className={achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'}>
                              {achievement.category}
                            </span>
                          </div>
                          <div className={`flex items-center space-x-1 ${achievement.isUnlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                            <Star className="h-4 w-4" />
                            <span>{achievement.points} points</span>
                          </div>
                          {achievement.unlockedAt && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <Calendar className="h-4 w-4" />
                              <span>{achievement.unlockedAt}</span>
                            </div>
                          )}
                        </div>

                        {!achievement.isUnlocked && achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-gray-600">{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="text-xs text-gray-500 font-medium mb-1">Requirements:</p>
                          <ul className="text-xs text-gray-500">
                            {achievement.requirements.map((req, index) => (
                              <li key={index}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎉 Recent Unlocks</h3>
              <div className="space-y-3">
                {recentUnlocked.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg ${achievement.color} flex items-center justify-center text-lg`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.unlockedAt}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">{achievement.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Progress Summary</h3>
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryAchievements = achievements.filter(a => a.category === category)
                  const unlockedInCategory = categoryAchievements.filter(a => a.isUnlocked).length
                  const progressPercentage = (unlockedInCategory / categoryAchievements.length) * 100

                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(category)}
                          <span className="text-sm font-medium text-gray-700">{category}</span>
                        </div>
                        <span className="text-sm text-gray-500">{unlockedInCategory}/{categoryAchievements.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Motivation */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">🌟 Keep Going!</h3>
              <p className="text-sm opacity-90 mb-3">
                You&apos;re doing great! You&apos;ve unlocked {userStats.achievementsUnlocked} out of {achievements.length} achievements.
              </p>
              <div className="text-xs opacity-75">
                Next achievement: Study Streak Master (Progress: {achievements.find(a => a.id === '3')?.progress}/30)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}