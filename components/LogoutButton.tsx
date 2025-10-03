'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
  showText?: boolean;
}

export default function LogoutButton({ className = '', showText = true }: LogoutButtonProps) {
  const { data: session } = useSession();

  if (!session) return null;

  const handleLogout = async () => {
    try {
      await signOut({ 
        callbackUrl: '/auth/signin',
        redirect: true 
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ${className}`}
      title="Sign out"
    >
      <LogOut className="h-5 w-5" />
      {showText && <span>Sign Out</span>}
    </button>
  );
}