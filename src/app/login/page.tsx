'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useThemeTransition } from '../../hooks/useThemeTransition';

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
    const { login } = useAuth();

    // Add theme transition hook
    useThemeTransition();

    useEffect(() => {
        // Only handle registration message
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('registered') === 'true') {
            setShowRegistrationMessage(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        setErrors({});
        setIsLoading(true);

        try {
            console.log('Login: Attempting login with:', formData);
            await login(formData.login, formData.password);
        } catch (error: any) {
            console.error('Login page error:', error);
            setApiError(
                error.message ||
                'Login failed. Please check your credentials and try again.'
            );
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/">
                        <Image
                            src="/images/fc1.png"
                            alt="Forbes Capital"
                            width={100}
                            height={100}
                            className="mx-auto dark:invert transform hover:scale-105 transition-all duration-200"
                            priority
                        />
                    </Link>
                </div>

                <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-center">
                            Welcome Back
                        </h1>

                        {showRegistrationMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-xl text-green-800 dark:text-green-200"
                            >
                                <p className="text-center">
                                    Registration successful! Please check your email to verify your account before logging in.
                                </p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Username or Email
                                </label>
                                <input
                                    type="text"
                                    name="login"
                                    value={formData.login}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.login ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87]`}
                                    placeholder="Enter your username or email"
                                />
                                {errors.login && (
                                    <p className="mt-1 text-sm text-red-500">{errors.login}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87]`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {apiError && (
                                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                    {apiError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative w-full inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full group"
                            >
                                <span className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#308e87] group-hover:bg-gradient-to-br group-hover:from-[#308e87] group-hover:via-[#308e87] group-hover:to-[#308e87] transition-all duration-300"></span>
                                <span className="relative">
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </span>
                            </button>

                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-[#308e87] hover:text-[#308e87]/80 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </form>

                        <div className="text-sm mt-4">
                            <Link
                                href="/forgot-password"
                                className="text-[#308e87] hover:text-[#277771]"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
