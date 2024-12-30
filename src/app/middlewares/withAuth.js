import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Halaman login khusus untuk admin dan peserta
    if (pathname === '/admin/login') {
      if (token?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return middleware(req, next); // Biarkan akses tanpa login
    }
    if (pathname === '/ppdb/l/auth') {
      if (token?.role === 'peserta') {
        console.log(token?.role);
        return NextResponse.redirect(new URL('/ppdb/l/kq', req.url));
      }
      return middleware(req, next); // Biarkan akses tanpa login
    }

    // Validasi akses untuk rute yang memerlukan autentikasi
    console.log('masuk');
    if (requireAuth.some((route) => pathname.startsWith(route))) {
      if (!token) {
        if (pathname.startsWith('/admin')) {
          const url = new URL('/admin/login', req.url);
          url.searchParams.set('callbackUrl', encodeURI(req.url));
          return NextResponse.redirect(url);
        }
        if (pathname.startsWith('/ppdb/l/kq')) {
          const url = new URL('/ppdb/l/auth', req.url);
          url.searchParams.set('callbackUrl', encodeURI(req.url));
          return NextResponse.redirect(url);
        }
      }

      // Validasi akses berdasarkan role
      if (pathname.startsWith('/admin') && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
      if (pathname.startsWith('/ppdb/l/kq') && token.role !== 'peserta') {
        return NextResponse.redirect(new URL('/ppdb/l/auth', req.url));
      }
    }
    console.log('oke');

    return middleware(req, next); // Lanjutkan ke middleware berikutnya
  };
}
