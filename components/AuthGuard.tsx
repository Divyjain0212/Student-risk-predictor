'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    // If authentication is required but no session exists
    if (requireAuth && !session) {
      router.push('/auth/signin');
      return;
    }

    // If session exists but user role is not allowed
    if (session && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      router.push('/auth/unauthorized');
      return;
    }
  }, [session, status, router, allowedRoles, requireAuth]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if authentication check fails
  if (requireAuth && !session) {
    return null;
  }

  if (session && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    return null;
  }

  return <>{children}</>;
}