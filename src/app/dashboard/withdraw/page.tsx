'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { WithdrawalForm } from '@/components/dashboard/withdraw/WithdrawalForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WithdrawPage() {
    const { profile, refreshProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkPin = async () => {
            try {
                await refreshProfile(); // Refresh profile data first
                if (!profile?.transaction_pin) {
                    console.log('No PIN found, redirecting...');
                    router.push('/dashboard/settings/transaction-pin');
                    return;
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error checking PIN:', error);
                setIsLoading(false);
            }
        };

        checkPin();
    }, [profile?.transaction_pin, refreshProfile, router]); // Add missing dependencies

    // Show loading state
    if (isLoading || !profile) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    // If there's no PIN, show the redirect message
    if (!profile.transaction_pin) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Transaction PIN Required
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        For your security, you need to set up a transaction PIN before making withdrawals.
                    </p>
                    <Link
                        href="/dashboard/settings/transaction-pin"
                        className="inline-block px-6 py-3 bg-[#308e87] text-white rounded-lg hover:bg-[#277771] transition-colors"
                    >
                        Set Up Transaction PIN
                    </Link>
                </div>
            </div>
        );
    }

    // Show withdrawal form only if PIN exists
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Withdraw Funds
                </h1>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h2 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Important Information:
                    </h2>
                    <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1 text-sm">
                        <li>Minimum withdrawal amount is $100</li>
                        <li>Withdrawals are processed within 24-48 hours</li>
                        <li>Please double-check your wallet address</li>
                        <li>Network fees may apply depending on the cryptocurrency</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WithdrawalForm
                    availableBalance={profile?.avail_balance || '0.00'}
                    onSuccess={async () => {
                        try {
                            await refreshProfile();
                        } catch (error) {
                            console.error('Error refreshing profile:', error);
                        }
                    }}
                />

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Available Balance
                    </h2>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Available for withdrawal
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${profile?.avail_balance || '0.00'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
