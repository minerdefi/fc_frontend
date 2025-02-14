import { RegisterData, AuthResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const API_URL = `${BASE_URL}/auth`;

class AuthService {
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
                    const errorMessage = Object.entries(responseData.errors)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ');
                    throw new Error(errorMessage);
                }
                throw new Error(responseData.message || 'Registration failed');
            }

            // Don't store tokens after registration since email needs verification
            return responseData;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    storeTokens(tokens: { refresh: string; access: string }) {
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
    }

    clearTokens() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
    }

    getAccessToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken');
        }
        return null;
    }

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

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
    }

    async login(credentials: { login: string; password: string }): Promise<AuthResponse> {
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
    }

    async getProfile() {
        try {
            const token = this.getAccessToken();
            if (!token) {
                console.error('No access token found');
                return null;
            }

            const response = await fetch('http://127.0.0.1:8000/auth/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (response.status === 401) {
                // Clear tokens and trigger re-login
                this.clearTokens();
                window.location.href = '/login';
                return null;
            }

            if (!response.ok) {
                throw new Error(`Profile fetch failed: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    }

    setTokens(tokens: { access: string; refresh: string }) {
        localStorage.setItem('accessToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    }
}

export const authService = new AuthService();
