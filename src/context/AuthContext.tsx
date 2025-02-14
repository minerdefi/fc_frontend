'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

interface AuthContextType {
    isAuthenticated: boolean;
    checkAuth: () => boolean;
    logout: () => void;
    login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const login = async (username: string, password: string) => {
        try {
            const response = await authService.login({ username, password });
            if (response.status === 'success') {
                setIsAuthenticated(true);
                router.push('/dashboard');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.clearTokens();
        setIsAuthenticated(false);
        router.push('/login');
    };

    const checkAuth = () => {
        const isValid = authService.isAuthenticated();
        setIsAuthenticated(isValid);
        return isValid;
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout, login }}>
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
