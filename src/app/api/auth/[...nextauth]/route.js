import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

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
        // if(email){
        //   return {
        //     id: 'sdfdf',email: email, role: 'admin', access_token: '3f3f'
        //   }
        // }

        const { data, error } = await supabase.auth.signInWithPassword(
          {
            email,
            password,
          },
          {
            expiresIn: 864000, // Token berlaku selama 10 hari
          }
        );

        if (error) throw new Error(error.message);

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
          role: data.user.user_metadata.role || 'admin',
          access_token: data.session.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
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
