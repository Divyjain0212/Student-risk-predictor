'use client'

import { SessionProvider } from 'next-auth/react'
import { NotificationProvider } from '../components/NotificationProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </SessionProvider>
  )
}