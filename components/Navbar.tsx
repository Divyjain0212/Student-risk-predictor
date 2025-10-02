'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NotificationDropdown from './NotificationDropdown';
import { NavbarLogo } from './AppLogo';
import {
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Users,
  BookOpen,
  Heart,
  Calendar,
  BarChart3,
  MessageCircle,
  Bell,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  const getRoleBasedNavItems = () => {
    const userRole = session?.user?.role;
    
    switch (userRole) {
      case 'student':
        return [
          { href: '/student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/student/counseling', label: 'Counseling', icon: Heart },
          { href: '/student/financial-support', label: 'Financial Aid', icon: BookOpen },
          { href: '/student/attendance-manager', label: 'Attendance', icon: Calendar },
        ];
      case 'admin':
        return [
          { href: '/admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
          { href: '/admin/students', label: 'Students', icon: Users },
          { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      case 'mentor':
        return [
          { href: '/mentor-dashboard', label: 'Mentor Dashboard', icon: LayoutDashboard },
          { href: '/mentor/students', label: 'My Students', icon: Users },
          { href: '/mentor/sessions', label: 'Sessions', icon: MessageCircle },
        ];
      case 'counselor':
        return [
          { href: '/counselor-dashboard', label: 'Counselor Dashboard', icon: LayoutDashboard },
          { href: '/counselor/sessions', label: 'Sessions', icon: MessageCircle },
          { href: '/counselor/students', label: 'Students', icon: Users },
        ];
      default:
        return [
          { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ];
    }
  };

  if (status === 'loading') {
    return (
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <NavbarLogo />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const navItems = getRoleBasedNavItems();

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <NavbarLogo />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-3">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-700">
                      {session?.user?.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {session?.user?.role || 'Member'}
                    </div>
                  </div>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {session?.user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>
                  
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Link>
                  
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {session?.user?.name}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {session?.user?.role}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </Link>
                
                <Link
                  href="/settings"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}