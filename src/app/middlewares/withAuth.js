import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log('token : ', token);

    if (pathname === '/admin/login') {
      if (token?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return middleware(req, next);
    }
    if (pathname === '/ppdb/l/auth') {
      if (token?.role === 'peserta') {
        return NextResponse.redirect(new URL('/ppdb/l', req.url));
      }
      return middleware(req, next);
    }

    if (requireAuth.some((route) => pathname.startsWith(route))) {
      if (!token) {
        if (pathname.startsWith('/admin')) {
          const url = new URL('/admin/login', req.url);
          url.searchParams.set('callbackUrl', encodeURI(req.url));
          return NextResponse.redirect(url);
        }
        if (pathname.startsWith('/ppdb/l')) {
          const url = new URL('/ppdb/l/auth', req.url);
          url.searchParams.set('callbackUrl', encodeURI(req.url));
          return NextResponse.redirect(url);
        }
      }

      if (pathname.startsWith('/admin') && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
      if (pathname.startsWith('/ppdb/l') && token.role !== 'peserta') {
        return NextResponse.redirect(new URL('/ppdb/l/auth', req.url));
      }
    }
    ('oke');

    return middleware(req, next);
  };
}
