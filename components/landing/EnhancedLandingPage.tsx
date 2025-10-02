'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Card } from '../ui/design-system'
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Heart,
  Star,
  CheckCircle,
  Globe,
  Award,
  Sparkles,
  GraduationCap
} from 'lucide-react'

export function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2" />
              Advanced Student Success Platform
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-slide-up">
              Empower Student
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Success with AI
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Transform your educational institution with intelligent student monitoring, 
              gamified engagement, and proactive crisis intervention powered by advanced analytics.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button size="xl" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-gray-500 mb-8">Trusted by 500+ educational institutions worldwide</p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-24 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything you need for student success
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Comprehensive tools designed to support students, educators, and administrators 
              in creating better educational outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card variant="glassmorphism" hover="glow" className="group">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Analytics</h3>
                <p className="text-gray-600 mb-6">
                  Advanced analytics and AI-powered insights to track student progress and identify at-risk students early.
                </p>
                <Link href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </Card>

            <Card variant="glassmorphism" hover="glow" className="group">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gamification</h3>
                <p className="text-gray-600 mb-6">
                  Engage students with achievement badges, level progression, and interactive challenges that motivate learning.
                </p>
                <Link href="#" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </Card>

            <Card variant="glassmorphism" hover="glow" className="group">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Crisis Support</h3>
                <p className="text-gray-600 mb-6">
                  24/7 crisis intervention tools with direct access to mental health resources and emergency support.
                </p>
                <Link href="#" className="text-red-600 font-medium hover:text-red-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </Card>

            <Card variant="glassmorphism" hover="glow" className="group">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration</h3>
                <p className="text-gray-600 mb-6">
                  Connect students, teachers, and counselors with seamless communication and collaboration tools.
                </p>
                <Link href="#" className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </Card>

            <Card variant="glassmorphism" hover="glow" className="group">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
                <p className="text-gray-600 mb-6">
                  FERPA-compliant data protection with enterprise-grade security and privacy controls.
                </p>
                <Link href="#" className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </Card>

            <Card variant="glassmorphism" hover="glow" className="group">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600 mb-6">
                  Built on modern technology stack for blazing-fast performance and seamless user experience.
                </p>
                <Link href="#" className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Trusted by institutions worldwide
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-blue-100">
              Join thousands of educators and administrators who are transforming education with EduSense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15K+</div>
              <div className="text-blue-200">Educators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What educators are saying
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Real feedback from real users who are making a difference in education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="elevated" className="p-8">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6">
                  "EduSense has transformed how we support our students. The early warning system 
                  helped us identify at-risk students and provide timely interventions."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                    <div className="text-gray-600">Dean of Student Affairs</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to transform your institution?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of educators who are already using EduSense to improve student outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="xl" className="w-full sm:w-auto">
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Free 30-day trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}