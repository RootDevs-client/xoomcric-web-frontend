import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const userRole = req.nextauth.token?.role;

    if (userRole === 'user' && req.nextUrl.pathname.includes('xoomadmin')) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) =>
        token?.role === 'user' || token?.role === 'admin',
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|icons|favicon.ico|series|match|team|player|favorites|watch|news|home|ip|xoomadmin/login|$).*)',
  ],
};
