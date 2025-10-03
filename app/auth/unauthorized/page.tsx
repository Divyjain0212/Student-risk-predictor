'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Unauthorized() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleGoBack = () => {
    if (session?.user?.role) {
      switch (session.user.role) {
        case 'admin':
          router.push('/admin-dashboard');
          break;
        case 'mentor':
          router.push('/mentor-dashboard');
          break;
        case 'counselor':
          router.push('/counselor-dashboard');
          break;
        case 'student':
          router.push('/student-dashboard');
          break;
        default:
          router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}