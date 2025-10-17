import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.fgpremiumfunds.com'}/auth/login/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await response.json();

                    if (!response.ok) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        accessToken: user.accessToken || '',
                        refreshToken: user.refreshToken || '',
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        }),

    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        // ...existing callbacks...
    },
    pages: {
        signIn: '/login',
        error: '/error',
    }
};
