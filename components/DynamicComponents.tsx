'use client'

import dynamic from 'next/dynamic'
import { ComponentLoader } from './LoadingSpinner'

// Dynamic imports for better code splitting
export const DynamicAIChat = dynamic(() => import('../app/ai-chat/page'), {
  loading: () => <ComponentLoader text="Loading AI Chat..." />,
  ssr: false
})

export const DynamicTestPortal = dynamic(() => import('../app/test-portal/page'), {
  loading: () => <ComponentLoader text="Loading Test Portal..." />,
  ssr: false
})

export const DynamicMotivationalVideos = dynamic(() => import('../app/motivational-videos/page'), {
  loading: () => <ComponentLoader text="Loading Videos..." />,
  ssr: false
})

export const DynamicAchievements = dynamic(() => import('../app/achievements/page'), {
  loading: () => <ComponentLoader text="Loading Achievements..." />,
  ssr: false
})

// Dashboard components
export const DynamicStudentDashboard = dynamic(() => import('../app/student-dashboard/page'), {
  loading: () => <ComponentLoader text="Loading Dashboard..." />,
  ssr: false
})

export const DynamicAdminDashboard = dynamic(() => import('../app/admin-dashboard/page'), {
  loading: () => <ComponentLoader text="Loading Admin Dashboard..." />,
  ssr: false
})

export const DynamicMentorDashboard = dynamic(() => import('../app/mentor-dashboard/page'), {
  loading: () => <ComponentLoader text="Loading Mentor Dashboard..." />,
  ssr: false
})

export const DynamicCounselorDashboard = dynamic(() => import('../app/counselor-dashboard/page'), {
  loading: () => <ComponentLoader text="Loading Counselor Dashboard..." />,
  ssr: false
})