'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Play, 
  Heart, 
  Share2, 
  Bookmark,
  BookmarkCheck,
  Clock,
  Eye,
  TrendingUp,
  Filter,
  Search,
  Star,
  Target,
  Brain,
  Zap
} from 'lucide-react'
import { PageLoader } from '../../components/LoadingSpinner'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  category: string
  description: string
  tags: string[]
  featured: boolean
  uploadDate: string
  speaker?: string
  isBookmarked?: boolean
}

export default function MotivationalVideos() {
  const { data: session, status } = useSession()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarkedVideos, setBookmarkedVideos] = useState<Set<string>>(new Set())

  const categories = [
    'Study Motivation',
    'Career Success', 
    'Personal Growth',
    'Stress Management',
    'Goal Setting',
    'Confidence Building'
  ]

  const motivationalVideos: Video[] = [
    {
      id: '1',
      title: 'The Power of Consistent Study Habits',
      thumbnail: '📚',
      duration: '12:34',
      views: 15420,
      likes: 892,
      category: 'Study Motivation',
      description: 'Learn how small daily study habits can lead to extraordinary academic success. Discover practical strategies for building consistency.',
      tags: ['consistency', 'study-habits', 'success'],
      featured: true,
      uploadDate: '2024-09-20',
      speaker: 'Dr. Sarah Johnson'
    },
    {
      id: '2', 
      title: 'Overcoming Exam Anxiety and Stress',
      thumbnail: '🧘',
      duration: '15:22',
      views: 8930,
      likes: 567,
      category: 'Stress Management',
      description: 'Practical techniques to manage exam stress and perform at your best when it matters most.',
      tags: ['anxiety', 'stress-relief', 'exams'],
      featured: false,
      uploadDate: '2024-09-15',
      speaker: 'Prof. Mike Chen'
    },
    {
      id: '3',
      title: 'Your Future Starts with Today\'s Choices',
      thumbnail: '🚀',
      duration: '18:45',
      views: 23150,
      likes: 1340,
      category: 'Career Success',
      description: 'An inspiring talk about how every decision you make today shapes your future career and life.',
      tags: ['future', 'choices', 'career'],
      featured: true,
      uploadDate: '2024-09-10',
      speaker: 'Lisa Rodriguez'
    },
    {
      id: '4',
      title: 'Building Unshakeable Confidence',
      thumbnail: '💪',
      duration: '14:18',
      views: 11650,
      likes: 723,
      category: 'Confidence Building',
      description: 'Step-by-step guide to developing genuine confidence that will serve you in academics and beyond.',
      tags: ['confidence', 'self-esteem', 'growth'],
      featured: false,
      uploadDate: '2024-09-05',
      speaker: 'David Kumar'
    },
    {
      id: '5',
      title: 'Setting and Achieving SMART Goals',
      thumbnail: '🎯',
      duration: '16:30',
      views: 19800,
      likes: 1120,
      category: 'Goal Setting',
      description: 'Master the art of goal setting with the SMART framework and turn your dreams into achievable plans.',
      tags: ['goals', 'planning', 'success'],
      featured: true,
      uploadDate: '2024-08-28',
      speaker: 'Emma Thompson'
    },
    {
      id: '6',
      title: 'Growth Mindset vs Fixed Mindset',
      thumbnail: '🧠',
      duration: '20:12',
      views: 31200,
      likes: 1850,
      category: 'Personal Growth',
      description: 'Understanding the difference between growth and fixed mindset and how it impacts your learning.',
      tags: ['mindset', 'growth', 'learning'],
      featured: true,
      uploadDate: '2024-08-20',
      speaker: 'Dr. Carol Williams'
    },
    {
      id: '7',
      title: 'Time Management for Students',
      thumbnail: '⏰',
      duration: '13:55',
      views: 16750,
      likes: 945,
      category: 'Study Motivation',
      description: 'Proven time management strategies specifically designed for students to maximize productivity.',
      tags: ['time-management', 'productivity', 'study'],
      featured: false,
      uploadDate: '2024-08-15',
      speaker: 'Alex Martinez'
    },
    {
      id: '8',
      title: 'Failing Forward: Learning from Setbacks',
      thumbnail: '📈',
      duration: '17:20',
      views: 12900,
      likes: 678,
      category: 'Personal Growth',
      description: 'How to turn failures into stepping stones for success and build resilience in your academic journey.',
      tags: ['failure', 'resilience', 'learning'],
      featured: false,
      uploadDate: '2024-08-10',
      speaker: 'Jennifer Park'
    }
  ]

  const filteredVideos = motivationalVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         video.speaker?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredVideos = motivationalVideos.filter(video => video.featured)

  const toggleBookmark = (videoId: string) => {
    setBookmarkedVideos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(videoId)) {
        newSet.delete(videoId)
      } else {
        newSet.add(videoId)
      }
      return newSet
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Study Motivation': return <Brain className="h-4 w-4" />
      case 'Career Success': return <Target className="h-4 w-4" />
      case 'Personal Growth': return <TrendingUp className="h-4 w-4" />
      case 'Stress Management': return <Heart className="h-4 w-4" />
      case 'Goal Setting': return <Star className="h-4 w-4" />
      case 'Confidence Building': return <Zap className="h-4 w-4" />
      default: return <Play className="h-4 w-4" />
    }
  }

  if (status === 'loading') {
    return <PageLoader />
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access Motivational Videos.</p>
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
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Motivational Videos</h1>
                <p className="text-gray-600">Inspire your academic journey with curated motivational content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Videos */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✨ Featured Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.slice(0, 3).map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative group cursor-pointer">
                    <div className="text-6xl">{video.thumbnail}</div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-8 w-8 text-purple-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>by {video.speaker}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{formatViews(video.views)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{video.likes}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        {getCategoryIcon(video.category)}
                        <span className="text-purple-600">{video.category}</span>
                      </div>
                      <button
                        onClick={() => toggleBookmark(video.id)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {bookmarkedVideos.has(video.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-purple-600" />
                        ) : (
                          <Bookmark className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Videos */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'All Videos' : selectedCategory}
              <span className="text-gray-500 text-base ml-2">({filteredVideos.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative group cursor-pointer">
                  <div className="text-4xl">{video.thumbnail}</div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-6 w-6 text-purple-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {video.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{video.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>by {video.speaker}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{formatViews(video.views)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    <span>{video.uploadDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs">
                      {getCategoryIcon(video.category)}
                      <span className="text-purple-600">{video.category}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => toggleBookmark(video.id)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        {bookmarkedVideos.has(video.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                        <Share2 className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {video.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                        {tag}
                      </span>
                    ))}
                    {video.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{video.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredVideos.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Motivation Quote */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-center">
          <blockquote className="text-white text-lg font-medium mb-2">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </blockquote>
          <p className="text-purple-100">- Winston Churchill</p>
        </div>
      </div>
    </div>
  )
}