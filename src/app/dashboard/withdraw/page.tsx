'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { WithdrawalForm } from '@/components/dashboard/withdraw/WithdrawalForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WithdrawPage() {
    const { profile, refreshProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [needsPin, setNeedsPin] = useState(false);

    useEffect(() => {
        if (profile) {
            setNeedsPin(!profile.transaction_pin);
            setIsLoading(false);
        }
    }, [profile]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (needsPin) {
        return (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-yellow-100 dark:bg-yellow-900">
                        <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m5-7V6a3 3 0 00-3-3H7a3 3 0 00-3 3v7m14 0v2a3 3 0 01-3 3H7a3 3 0 01-3-3v-2m14 0h-3m-7 0h-3" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Transaction PIN Required</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">For your security, please set up your transaction PIN before making any withdrawals.</p>
                    <Link
                        href="/dashboard/settings/transaction-pin"
                        className="inline-flex items-center px-6 py-3 bg-[#308e87] hover:bg-[#277772] transition-colors duration-200 text-white font-semibold rounded-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Set Up PIN
                    </Link>
                </div>
            </div>
        );
    }

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
