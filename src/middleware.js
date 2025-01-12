import { NextResponse } from 'next/server';
import withAuth from './app/middlewares/withAuth';

export function mainMiddleware(req) {
  const res = NextResponse.next();
  return res;
}
export default withAuth(mainMiddleware, ['/admin', '/ppdb/l']);

// export const config = { matcher: ['/(admin|ppdb/l)(.*)', '/admin/login', '/ppdb/l/auth'] };
export const config = { matcher: ['/(admin|ppdb/l|admin/login|ppdb/l/auth)'] };
