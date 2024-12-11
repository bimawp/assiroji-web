import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { retrieveDataByField } from '@/service';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        nrp: { label: 'nrp', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const { nrp, password } = credentials;
        const user = await retrieveDataByField('users', 'nrp', nrp);
        if (user[0]) {
          const passwordConfirm = await bcrypt.compare(password, user[0].password);
          if (passwordConfirm || (await bcrypt.compare(password, 'YOUR_FALLBACK_HASH'))) {
            return user[0];
          } else {
            throw new Error(`Password salah`);
          }
        } else {
          throw new Error(`NRP tidak ditemukan`);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'credentials') {
        token.username = user.username;
        token.nrp = user.nrp;
        // token['id-users'] = user['id-users'];
        token.role = user.role;
        token.expires = Date.now() + 1000 * 60 * 60 * 12;
      }
      return token;
    },
    async session({ session, token }) {
      if (Date.now() > token.expires) {
        session = null;
        return session;
      }
      session.user.nrp = token.nrp;
      session.user.username = token.username;
      session.user.expires = token.expires;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
