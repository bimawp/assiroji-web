import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;

    if (pathname !== '/admin/login' && requireAuth.some((route) => pathname.startsWith(route))) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      console.log(token);

      if (!token) {
        const url = new URL('/admin/login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token.role === 'Admin' && !pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    return middleware(req, next);
  };
}
