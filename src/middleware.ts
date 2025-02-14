import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for access token in cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    const isAuthenticated = !!accessToken;

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Prevent authenticated users from accessing auth pages
    if (['/login', '/register'].includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
    ],
};
