'use client';

import { useState } from 'react';
import { apiRequest } from '@/utils/api';
import { authService } from '../../../../services/auth.service';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get('current_password') as string;
        const newPassword = formData.get('new_password') as string;
        const confirmPassword = formData.get('confirm_password') as string;

        try {
            // Client-side validation
            if (newPassword !== confirmPassword) {
                setMessage({ type: 'error', text: 'New passwords do not match' });
                return;
            }

            if (newPassword.length < 8) {
                setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
                return;
            } const response = await apiRequest('/auth/change-password/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authService.getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessage({ type: 'success', text: data.message });
                e.currentTarget.reset();

                // Update tokens
                if (data.data?.tokens) {
                    authService.setTokens(data.data.tokens);
                }

                // Redirect after 2 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Failed to change password'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Change Password
                </h1>

                {message && (
                    <div className={`mb-4 p-4 rounded-lg ${message.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="current_password"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="new_password"
                                required
                                minLength={8}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirm_password"
                                required
                                minLength={8}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-[#308e87] text-white rounded-md hover:bg-[#277771] disabled:opacity-50"
                        >
                            {isLoading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
