import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import { User } from '../../../../models';
import type { JWT } from 'next-auth/jwt';
import type { Session, User as NextAuthUser } from 'next-auth';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: { label: 'Email/Phone/Student ID', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.identifier || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          await connectToDatabase();
          
          // Find user by email, phone, or studentId
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { phone: credentials.identifier },
              { studentId: credentials.identifier }
            ],
            isActive: true
          });
          
          if (!user) {
            console.log('User not found for identifier:', credentials.identifier);
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            console.log('Invalid password for user:', credentials.identifier);
            return null;
          }

          console.log('Authentication successful for user:', credentials.identifier);

          // Update last login
          await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

          return {
            id: user._id.toString(),
            email: user.email,
            phone: user.phone,
            name: user.name,
            role: user.role,
            studentId: user.studentId,
            department: user.department,
            specialization: user.specialization,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };