import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware will only run on API routes due to the matcher config
export function middleware(request: NextRequest) {
    // Only handle API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const authToken = request.cookies.get('auth-token')?.value;

        if (authToken) {
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('Authorization', `Bearer ${authToken}`);

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        }
    }

    return NextResponse.next();
}

// Only run middleware on API routes, leaving other routes unaffected
export const config = {
    matcher: [
        '/api/:path*',
        // Exclude Next.js internals
        '!(/_next/static|/_next/image|/favicon.ico)',
    ],
};
