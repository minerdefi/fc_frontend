
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authService } from '../../services/auth.service';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

const VerifyEmailPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams?.get('token');
            if (!token) {
                setStatus('error');
                setMessage('Invalid verification link');
                return;
            }

            try {
                await authService.verifyEmail(token);
                setStatus('success');
                setMessage('Email verified successfully!');
            } catch (error) {
                setStatus('error');
                setMessage(error instanceof Error ? error.message : 'Verification failed');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md text-center"
            >
                <Link href="/" className="inline-block mb-12">
                    <Image
                        src="/images/fc1.png"
                        alt="FG Premium"
                        width={100}
                        height={100}
                        className="mx-auto dark:invert transform hover:scale-105 transition-all duration-200"
                        priority
                    />
                </Link>

                {status === 'loading' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#308e87] mx-auto mb-8"></div>
                        <p className="text-xl text-gray-600 dark:text-gray-300">{message}</p>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{message}</h2>
                        <Link
                            href="/login"
                            className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full group"
                        >
                            <span className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#308e87] group-hover:bg-gradient-to-br group-hover:from-[#308e87] group-hover:via-[#308e87] group-hover:to-[#308e87] transition-all duration-300"></span>
                            <span className="relative">Go to Login</span>
                        </Link>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verification Failed</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{message}</p>
                        <Link
                            href="/register"
                            className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full group"
                        >
                            <span className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#308e87] group-hover:bg-gradient-to-br group-hover:from-[#308e87] group-hover:via-[#308e87] group-hover:to-[#308e87] transition-all duration-300"></span>
                            <span className="relative">Back to Registration</span>
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyEmailPage;
