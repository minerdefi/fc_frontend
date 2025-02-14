import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Add auth token to all API requests
    const authToken = request.cookies.get('auth-token')?.value;

    if (authToken && request.nextUrl.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('Authorization', `Bearer ${authToken}`);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}
