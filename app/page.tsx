'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Users, Shield, Heart, BarChart3, ArrowRight, BookOpen, Calendar, Award } from 'lucide-react';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    // Redirect authenticated users to their dashboard
    const userRole = session.user?.role;
    let dashboardUrl = '/dashboard';
    
    switch (userRole) {
      case 'student':
        dashboardUrl = '/student-dashboard';
        break;
      case 'admin':
        dashboardUrl = '/admin-dashboard';
        break;
      case 'mentor':
        dashboardUrl = '/mentor-dashboard';
        break;
      case 'counselor':
        dashboardUrl = '/counselor-dashboard';
        break;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name}!
          </h1>
          <p className="text-gray-600 mb-6 capitalize">
            You&apos;re signed in as a {session.user?.role}
          </p>
          <Link
            href={dashboardUrl}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            EduSense
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI-powered smart education platform for comprehensive student support and academic success.
            Supporting students, mentors, counselors, and administrators in creating a better educational environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium border border-blue-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supporting Every Role in Education
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools and insights for students, educators, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Student Features */}
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Students</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Personal dashboard</li>
                <li>• Counseling support</li>
                <li>• Financial aid guidance</li>
                <li>• Achievement tracking</li>
                <li>• Learning resources</li>
              </ul>
            </div>

            {/* Admin Features */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Admins</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Student analytics</li>
                <li>• Risk monitoring</li>
                <li>• Government integration</li>
                <li>• Institutional reports</li>
                <li>• Data forwarding</li>
              </ul>
            </div>

            {/* Mentor Features */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Mentors</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Mentee management</li>
                <li>• Session scheduling</li>
                <li>• Progress tracking</li>
                <li>• Goal setting</li>
                <li>• Communication tools</li>
              </ul>
            </div>

            {/* Counselor Features */}
            <div className="bg-pink-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Counselors</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Session management</li>
                <li>• Student counseling</li>
                <li>• Crisis intervention</li>
                <li>• Progress reports</li>
                <li>• Mental health support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Student Support
            </h2>
            <p className="text-lg text-gray-600">
              Advanced AI-powered features to identify and support at-risk students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Analysis</h3>
              <p className="text-gray-600">
                AI-powered risk prediction based on academic performance, attendance, and engagement patterns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Intervention Tracking</h3>
              <p className="text-gray-600">
                Track interventions, counseling sessions, and support measures to ensure student success.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gamification</h3>
              <p className="text-gray-600">
                Motivate students with achievement badges, points system, and leaderboards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Support Student Success?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our platform and make a difference in student lives
          </p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 EduSense. Built for educational institutions to support student success and academic excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}