'use client';

import { useState } from 'react';
import { authService } from '../../../../services/auth.service';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';

export default function TransactionPinPage() {
    const router = useRouter();
    const [step, setStep] = useState<'request-otp' | 'set-pin'>('request-otp');
    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRequestOTP = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await fetch('https://minerdefi.pythonanywhere.com/auth/transaction-pin/request-otp/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authService.getAccessToken()}`,
                },
            });

            const data = await response.json();
            if (data.status === 'success') {
                setStep('set-pin');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetPin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/transaction-pin/set/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authService.getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, pin, confirm_pin: confirmPin }),
            });

            const data = await response.json();
            if (data.status === 'success') {
                setSuccess(true);
                // Add a slight delay before redirecting
                setTimeout(() => {
                    router.push('/dashboard/withdraw');
                }, 1500);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to set PIN');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Set Transaction PIN
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-green-600 dark:text-green-400 mb-2">
                            Transaction PIN set successfully!
                        </p>
                        <p className="text-sm text-green-500 dark:text-green-300">
                            Redirecting to withdrawal page...
                        </p>
                    </div>
                ) : step === 'request-otp' ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            To set up your transaction PIN, we'll first send a verification code to your email.
                        </p>
                        <button
                            onClick={handleRequestOTP}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-[#308e87] text-white rounded-md hover:bg-[#277771] disabled:opacity-50"
                        >
                            {isLoading ? 'Sending...' : 'Send Verification Code'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSetPin} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Security Information
                            </h2>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    Your transaction PIN adds an extra layer of security to your withdrawals.
                                </p>
                                <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                    <li>PIN must be 6 digits</li>
                                    <li>Use a PIN you can remember but is hard to guess</li>
                                    <li>Don't share your PIN with anyone</li>
                                    <li>You'll need this PIN for all withdrawals</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    New PIN
                                </label>
                                <input
                                    type="password"
                                    maxLength={6}
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Confirm PIN
                                </label>
                                <input
                                    type="password"
                                    maxLength={6}
                                    value={confirmPin}
                                    onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-[#308e87] text-white rounded-md hover:bg-[#277771] disabled:opacity-50"
                            >
                                {isLoading ? 'Setting PIN...' : 'Set PIN'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
