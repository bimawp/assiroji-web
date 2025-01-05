import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Supabase Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (user.role === 'peserta') {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('password tidak valid');
          }

          return {
            id: user.id_user,
            email,
            name: user.name,
            role: user.role,
          };
        }

        const { data, error } = await supabase.auth.signInWithPassword(
          {
            email,
            password,
          },
          {
            expires_in: 7 * 24 * 60 * 60,
          }
        );

        if (error) throw new Error(error.message);
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
          role: data.user.user_metadata.role,
          access_token: data.session.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // if (account?.provider === 'credentials') {
      //   token.name = user.name;
      //   // token.expires = Date.now() + 1000 * 60 * 60 * 12;
      //   // token.exp = Date.now() + 1000 * 60;
      // }
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.access_token = token.access_token;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
