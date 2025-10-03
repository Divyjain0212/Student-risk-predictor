import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If no token, and not on a public route, let the default handler redirect to signin
    if (!token) {
      return NextResponse.next();
    }

    // Role-based access control
    const userRole = token.role as string;
    
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }
    if (pathname.startsWith('/mentor') && userRole !== 'mentor' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }
    if (pathname.startsWith('/counselor') && userRole !== 'counselor' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }
    if (pathname.startsWith('/student') && userRole !== 'student' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }

    // If user is logged in and tries to access signin page, redirect them to their dashboard
    if (pathname.startsWith('/auth/signin')) {
        switch (userRole) {
            case 'admin':
              return NextResponse.redirect(new URL('/admin-dashboard', req.url));
            case 'mentor':
              return NextResponse.redirect(new URL('/mentor-dashboard', req.url));
            case 'counselor':
              return NextResponse.redirect(new URL('/counselor-dashboard', req.url));
            case 'student':
              return NextResponse.redirect(new URL('/student-dashboard', req.url));
            default:
              return NextResponse.redirect(new URL('/', req.url));
          }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/student-dashboard/:path*',
    '/mentor-dashboard/:path*',
    '/counselor-dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/notifications/:path*',
  ],
};