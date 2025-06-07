'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '../services/auth.service';
import { apiRequest } from '../utils/api';

interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface ProfileData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    balance: string;
    earnings: string;
    ADA: string;
    avail_balance: string;
    Tax_balance: string;
    deposit: string;
    total_deposits: string;
    total_withdrawals: string;
    created_at: string;
    transaction_pin: string | null;
    has_transaction_pin: boolean;
}

interface AuthContextType {
    isAuthenticated: boolean;
    checkAuth: () => Promise<boolean>; // changed from () => boolean
    logout: () => void;
    login: (username: string, password: string) => Promise<void>;
    user: User | null;
    profile: ProfileData | null;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const checkAuth = async () => {
        const token = authService.getAccessToken();
        const isValid = !!token;
        setIsAuthenticated(isValid);
        return isValid;
    };

    useEffect(() => {
        checkAuth();
    }, [pathname]);

    const login = async (login: string, password: string) => {
        try {
            console.log('AuthContext: Starting login process');
            const response = await authService.login({ login, password });
            console.log('AuthContext: Login response:', response);

            if (response.status === 'success') {
                setIsAuthenticated(true);
                setUser(response.data.user);
                await fetchProfile(); // Fetch profile before redirect
                console.log('AuthContext: Login successful, redirecting...');
                router.push('/dashboard');
                return response;
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('AuthContext: Login error:', error);
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        authService.clearTokens();
        setIsAuthenticated(false);
        setUser(null);
        setProfile(null);
        // Use window.location.href for hard navigation
        window.location.href = '/login';
    };

    const fetchProfile = async () => {
        try {
            if (!authService.getAccessToken()) {
                setIsAuthenticated(false);
                setProfile(null);
                return;
            }

            const response = await authService.getProfile();
            if (response?.status === 'success') {
                setProfile(response.data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setProfile(null);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setIsAuthenticated(false);
            setProfile(null);

            // Redirect to login if unauthorized
            if (error instanceof Error && error.message.includes('401')) {
                window.location.href = '/login';
            }
        }
    }; const refreshProfile = async () => {
        try {
            const token = authService.getAccessToken();
            if (!token) return;

            const response = await apiRequest('/auth/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success') {
                    setProfile(data.data);
                }
            }
        } catch (error) {
            console.error('Error refreshing profile:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout, login, user, profile, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
