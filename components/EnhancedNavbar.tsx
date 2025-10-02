'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  User, LogOut, Settings, LayoutDashboard, Users, BookOpen, Heart, 
  Calendar, BarChart3, MessageCircle, Bell, Menu, X, Search, 
  ChevronDown, Home, GraduationCap
} from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import { Button } from './ui/design-system'

export default function EnhancedNavbar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileMenu(false)
      setShowNotifications(false)
    }
    
    if (showProfileMenu || showNotifications) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showProfileMenu, showNotifications])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/auth/signin')
  }

  const getRoleBasedNavItems = () => {
    const userRole = session?.user?.role
    
    switch (userRole) {
      case 'student':
        return [
          { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: pathname.includes('/student/dashboard') },
          { href: '/student/attendance-manager', label: 'Attendance', icon: Calendar, active: pathname.includes('/attendance-manager') },
          { href: '/student/academic-support', label: 'Academic', icon: BookOpen, active: pathname.includes('/academic-support') },
          { href: '/student/counseling', label: 'Counseling', icon: Heart, active: pathname.includes('/counseling') },
          { href: '/student/financial-support', label: 'Financial Aid', icon: GraduationCap, active: pathname.includes('/financial-support') },
        ]
      case 'admin':
        return [
          { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: pathname.includes('/admin/dashboard') },
          { href: '/admin/students', label: 'Students', icon: Users, active: pathname.includes('/admin/students') },
          { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, active: pathname.includes('/analytics') },
          { href: '/admin/settings', label: 'Settings', icon: Settings, active: pathname.includes('/settings') },
        ]
      case 'teacher':
        return [
          { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: pathname.includes('/teacher/dashboard') },
          { href: '/teacher/students', label: 'My Students', icon: Users, active: pathname.includes('/teacher/students') },
          { href: '/teacher/classes', label: 'Classes', icon: BookOpen, active: pathname.includes('/classes') },
        ]
      case 'counselor':
        return [
          { href: '/counselor/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: pathname.includes('/counselor/dashboard') },
          { href: '/counselor/sessions', label: 'Sessions', icon: MessageCircle, active: pathname.includes('/sessions') },
          { href: '/counselor/students', label: 'Students', icon: Users, active: pathname.includes('/counselor/students') },
        ]
      default:
        return [
          { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: pathname.includes('/dashboard') },
        ]
    }
  }

  if (status === 'loading') {
    return (
      <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
          : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  EduSense
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const navItems = getRoleBasedNavItems()
  const unreadNotifications = 3 // This would come from your notification system

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
          : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  EduSense
                </span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span>/</span>
                <span className="capitalize text-gray-700 font-medium">
                  {session?.user?.role}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      item.active
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      item.active ? 'text-blue-600' : ''
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden xl:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-lg">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
                
                <NotificationDropdown 
                  isOpen={showNotifications} 
                  onClose={() => setShowNotifications(false)} 
                />
              </div>

              {/* User Profile Dropdown */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 hover:bg-blue-50 px-3 py-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">
                      {session?.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {session?.user?.role || 'Member'}
                    </p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                    showProfileMenu ? 'rotate-180' : ''
                  }`} />
                </Button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-scale-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{session?.user?.name}</p>
                      <p className="text-sm text-gray-500">{session?.user?.email}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2 capitalize">
                        {session?.user?.role}
                      </span>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>Preferences</span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Mobile Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                        item.active
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-800">{session?.user?.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{session?.user?.role}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-3 py-2.5 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-3 py-2.5 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 w-full px-3 py-2.5 text-base text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop Overlay */}
      {(showProfileMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => {
            setShowProfileMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </>
  )
}