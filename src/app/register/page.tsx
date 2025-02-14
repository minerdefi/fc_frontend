'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

const RegisterPage = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);

        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await authService.register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                });

                if (response.status === 'success') {
                    // Preserve theme when navigating
                    const currentTheme = theme;
                    localStorage.setItem('forbes-capital-theme', currentTheme || 'system');
                    window.location.href = '/login?registered=true';
                }
            } catch (error: any) {
                setApiError(error.message || 'Registration failed');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black relative">
            {/* Theme Toggle Button */}
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Toggle theme"
                >
                    {mounted && theme === 'dark' ? (
                        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="flex min-h-screen">
                {/* Left side - Image */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-[#308e87]/10 dark:bg-[#308e87]/5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                    >
                        <div className="w-full h-full relative bg-gradient-to-br from-[#308e87]/20 to-transparent rounded-3xl overflow-hidden">
                            <Image
                                src="/images/signup.jpg"
                                alt="Investment Illustration"
                                fill
                                className="object-cover mix-blend-overlay"
                                priority
                            />
                            <div className="absolute inset-0 backdrop-blur-sm"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Right side - Form */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8"
                    >
                        <div className="w-full max-w-md">
                            {/* Logo Section */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex justify-center mb-8"
                            >
                                <Link href="/" className="inline-block">
                                    <Image
                                        src="/images/fc1.png"
                                        alt="Forbes Capital"
                                        width={80}
                                        height={80}
                                        className="dark:invert transform hover:scale-105 transition-transform duration-200"
                                        priority
                                    />
                                </Link>
                            </motion.div>

                            <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-center">
                                        Create Your Account
                                    </h1>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87]`}
                                                    placeholder="Enter your first name"
                                                />
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Your legal first name as it appears on official documents
                                                </p>
                                                {errors.firstName && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87]`}
                                                    placeholder="Enter your last name"
                                                />
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Your legal last name as it appears on official documents
                                                </p>
                                                {errors.lastName && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Username
                                            </label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                                    @
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className={`w-full pl-8 px-4 py-2.5 rounded-xl border ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87] transition-all duration-200`}
                                                    placeholder="johndoe"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Choose a unique username that will identify you on our platform
                                            </p>
                                            {errors.username && (
                                                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87]`}
                                                placeholder="you@example.com"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                We'll use this email for account verification and important updates
                                            </p>
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
                                                placeholder="Create a strong password"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Must be at least 8 characters long and include uppercase, lowercase, and numbers
                                            </p>
                                            {errors.password && (
                                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-[#308e87]`}
                                                placeholder="Re-enter your password"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Please re-enter your password to confirm
                                            </p>
                                            {errors.confirmPassword && (
                                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                            )}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 text-[#308e87] border-gray-300 rounded focus:ring-[#308e87]"
                                                />
                                                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                                    I agree to the{' '}
                                                    <Link
                                                        href="/terms"
                                                        className="text-[#308e87] hover:text-[#308e87]/80"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleNavigation('/terms');
                                                        }}
                                                    >
                                                        Terms of Service
                                                    </Link>
                                                    {' '}and{' '}
                                                    <Link
                                                        href="/privacy"
                                                        className="text-[#308e87] hover:text-[#308e87]/80"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleNavigation('/privacy');
                                                        }}
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                        Forbes Capital is regulated and authorized by the Financial Conduct Authority (FCA)
                                                    </p>
                                                </label>
                                            </div>
                                            {errors.agreeToTerms && (
                                                <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="relative w-full inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full group"
                                            >
                                                <span className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#308e87] group-hover:bg-gradient-to-br group-hover:from-[#308e87] group-hover:via-[#308e87] group-hover:to-[#308e87] transition-all duration-300"></span>
                                                <span className="relative">
                                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                                </span>
                                            </button>

                                            {apiError && (
                                                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                                    {apiError}
                                                </div>
                                            )}

                                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                                Already have an account?{' '}
                                                <button
                                                    onClick={() => {
                                                        const currentTheme = theme;
                                                        localStorage.setItem('forbes-capital-theme', currentTheme || 'system');
                                                        window.location.href = '/login';
                                                    }}
                                                    className="text-[#308e87] hover:text-[#308e87]/80 font-medium"
                                                >
                                                    Sign in
                                                </button>
                                            </p>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
