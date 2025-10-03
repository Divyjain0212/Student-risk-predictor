import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Extends the built-in session.user object to include custom properties.
   */
  interface Session {
    user: {
      id: string;
      role: string;
      studentId?: string;
      department?: string;
      specialization?: string;
    } & DefaultSession['user'];
  }

  /**
   * Extends the built-in user object.
   */
  interface User {
    role: string;
    studentId?: string;
    department?: string;
    specialization?: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extends the built-in JWT token to include custom properties.
   */
  interface JWT {
    role: string;
    studentId?: string;
    department?: string;
    specialization?: string;
  }
}