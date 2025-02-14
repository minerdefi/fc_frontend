import { RegisterData, AuthResponse } from '@/types/auth';

const API_URL = 'http://127.0.0.1:8000/auth';

export const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    password2: data.confirmPassword,
                    first_name: data.firstName,
                    last_name: data.lastName
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.errors) {
                    // Handle validation errors
                    const errorMessage = Object.entries(responseData.errors)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ');
                    throw new Error(errorMessage);
                }
                throw new Error(responseData.message || 'Registration failed');
            }

            return responseData;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    storeTokens(tokens: { refresh: string; access: string }) {
        // Store in localStorage for easy access
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);

        // Store in cookies for middleware
        document.cookie = `accessToken=${tokens.access}; path=/`;
        document.cookie = `refreshToken=${tokens.refresh}; path=/`;
    },

    clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    },

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    },

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    },

    async verifyEmail(token: string): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/verify-email/?token=${token}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            return data;
        } catch (error) {
            console.error('Email verification error:', error);
            throw error;
        }
    },

    async login(credentials: { username: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store tokens in both localStorage and cookies
            this.storeTokens(data.data.tokens);

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
};
