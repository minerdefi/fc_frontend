import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';

// Define base interface for custom user data
interface UserData {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
}

// Extend the built-in session and JWT types
declare module 'next-auth' {
    interface Session {
        user: UserData;
    }
    interface User extends UserData { }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        name: string;
        accessToken: string;
        refreshToken: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<UserData | null> {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fc-backend-cnxm.onrender.com'}/auth/login/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(credentials)
                    });

                    if (!res.ok) {
                        console.error('Login failed:', await res.text());
                        return null;
                    }

                    const data = await res.json();

                    if (data.status === 'success' && data.data?.user) {
                        // Ensure all required fields are present
                        const user: UserData = {
                            id: data.data.user.email,
                            email: data.data.user.email,
                            name: data.data.user.username || data.data.user.email, // Fallback to email if username is not present
                            accessToken: data.data.tokens.access,
                            refreshToken: data.data.tokens.refresh
                        };
                        return user;
                    }
                    return null;
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }): Promise<JWT> {
            if (user) {
                // Cast user to UserData to ensure type safety
                const userData = user as UserData;
                return {
                    ...token,
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    accessToken: userData.accessToken,
                    refreshToken: userData.refreshToken,
                };
            }
            // Must return the token as is if no user
            return token;
        },
        async session({ session, token }) {
            // Update session with token data
            session.user = {
                id: token.id as string,
                email: token.email as string,
                name: token.name as string,
                accessToken: token.accessToken as string,
                refreshToken: token.refreshToken as string,
            };
            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/error',
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic';
