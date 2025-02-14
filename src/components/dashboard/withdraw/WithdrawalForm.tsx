'use client';

import { useState } from 'react';
import { authService } from '@/services/auth.service';

const PAYMENT_METHODS = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'USDT', label: 'USDT (TRC-20)' },
    { value: 'BCH', label: 'Bitcoin Cash (BCH)' },
];

interface WithdrawalFormProps {
    availableBalance: string;
    onSuccess?: () => void;
}

export function WithdrawalForm({ availableBalance, onSuccess }: WithdrawalFormProps) {
    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [transactionPin, setTransactionPin] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const validateAmount = (amount: string) => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            throw new Error('Please enter a valid amount');
        }
        if (numAmount < 100) {
            throw new Error('Minimum withdrawal amount is $100');
        }
        if (numAmount > parseFloat(availableBalance)) {
            throw new Error('Amount exceeds available balance');
        }
        return numAmount;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsSubmitting(true);

        try {
            // Add PIN validation
            if (!transactionPin || transactionPin.length !== 6) {
                throw new Error('Please enter your 6-digit transaction PIN');
            }

            // Validate amount
            const validAmount = validateAmount(amount);

            // Validate wallet address
            if (!walletAddress.trim()) {
                throw new Error('Please enter a valid wallet address');
            }

            const token = authService.getAccessToken();
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch('http://127.0.0.1:8000/auth/withdrawals/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: validAmount,
                    payment_method: paymentMethod,
                    wallet_address: walletAddress.trim(),
                    transaction_pin: transactionPin
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit withdrawal');
            }

            const data = await response.json();
            console.log('Withdrawal response:', data);

            if (data.status === 'success') {
                setSuccess(true);
                setAmount('');
                setWalletAddress('');
                setTransactionPin(''); // Clear PIN on success
                // Show success message with amount
                const formattedAmount = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(validAmount);
                setSuccessMessage(`Withdrawal request for ${formattedAmount} submitted successfully`);
                onSuccess?.();
            } else {
                throw new Error(data.message || 'Failed to submit withdrawal');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to submit withdrawal');
            console.error('Withdrawal error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Withdrawal Details
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 space-y-2">
                    <p className="text-green-600 dark:text-green-400">
                        {successMessage}
                    </p>
                    <p className="text-sm text-green-500 dark:text-green-300">
                        You can track your withdrawal status in the transactions section.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Payment Method
                    </label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"
                        required
                    >
                        {PAYMENT_METHODS.map(method => (
                            <option key={method.value} value={method.value}>
                                {method.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Amount
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"
                            placeholder="Enter amount"
                            required
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-500">
                            Available: ${availableBalance}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Wallet Address
                    </label>
                    <input
                        type="text"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"
                        placeholder="Enter wallet address"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Transaction PIN
                    </label>
                    <input
                        type="password"
                        maxLength={6}
                        value={transactionPin}
                        onChange={(e) => setTransactionPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"
                        placeholder="Enter 6-digit PIN"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#277771] 
                             text-white rounded-md hover:from-[#277771] hover:to-[#1f5d58]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 shadow-sm hover:shadow"
                >
                    {isSubmitting ? 'Processing...' : 'Submit Withdrawal'}
                </button>
            </div>
        </form>
    );
}
