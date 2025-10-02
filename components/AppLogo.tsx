'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon-only' | 'text-only'
  className?: string
  showTagline?: boolean
}

const sizeClasses = {
  sm: {
    container: 'h-8',
    image: 'h-6 w-6',
    text: 'text-lg',
    tagline: 'text-xs'
  },
  md: {
    container: 'h-12',
    image: 'h-10 w-10',
    text: 'text-xl',
    tagline: 'text-sm'
  },
  lg: {
    container: 'h-16',
    image: 'h-14 w-14',
    text: 'text-2xl',
    tagline: 'text-base'
  },
  xl: {
    container: 'h-24',
    image: 'h-20 w-20',
    text: 'text-4xl',
    tagline: 'text-lg'
  }
}

export function AppLogo({ 
  size = 'md', 
  variant = 'full', 
  className = '',
  showTagline = false 
}: LogoProps) {
  const sizes = sizeClasses[size]

  // Using the actual logo.jpg provided by the user
  const LogoIcon = () => (
    <div className={cn("flex items-center justify-center", sizes.image)}>
      <Image 
        src="/logo.jpg" 
        alt="EduSense Logo - Tree of Knowledge" 
        width={parseInt(sizes.image.split('h-')[1]?.split(' ')[0] || '8') * 4} 
        height={parseInt(sizes.image.split('h-')[1]?.split(' ')[0] || '8') * 4}
        className={cn("object-contain", sizes.image)}
        priority
      />
    </div>
  )

  const AppName = () => (
    <div className="flex flex-col">
      <span className={cn(
        "font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent",
        sizes.text
      )}>
        EduSense
      </span>
    </div>
  )

  if (variant === 'icon-only') {
    return (
      <div className={cn("flex items-center", sizes.container, className)}>
        <LogoIcon />
      </div>
    )
  }

  if (variant === 'text-only') {
    return (
      <div className={cn("flex items-center", sizes.container, className)}>
        <AppName />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center space-x-3", sizes.container, className)}>
      <LogoIcon />
      <AppName />
    </div>
  )
}

// Pre-configured logo variants for common use cases
export const NavbarLogo = () => <AppLogo size="sm" variant="full" />
export const HeaderLogo = () => <AppLogo size="lg" variant="full" showTagline />
export const FooterLogo = () => <AppLogo size="md" variant="full" showTagline />
export const LoginLogo = () => <AppLogo size="xl" variant="full" showTagline />