import { useState } from 'react';
import { apiRequest } from '../../../utils/api';
import { authService } from '../../../services/auth.service';
import Loader from '../../common/Loader';

interface DepositFormProps {
    selectedCrypto: string;
    minimumDeposit?: string;
}

export function DepositForm({ selectedCrypto, minimumDeposit }: DepositFormProps) {
    const [amount, setAmount] = useState('');
    const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsSubmitting(true);

        try {
            if (!selectedCrypto) {
                throw new Error('Please select a cryptocurrency');
            }

            if (!amount || parseFloat(amount) <= 0) {
                throw new Error('Please enter a valid amount');
            }

            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('payment_type', selectedCrypto);
            if (proofOfPayment) {
                formData.append('proof_of_payment', proofOfPayment);
            }

            const token = authService.getAccessToken();
            if (!token) {
                throw new Error('Authentication required');
            } const response = await apiRequest('/auth/deposits/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const data = await response.json();
            if (data.status === 'success') {
                setSuccess(true);
                setAmount('');
                setProofOfPayment(null);
                // Reset file input
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                throw new Error(data.message || 'Failed to submit deposit');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to submit deposit');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-6 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Deposit Details
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
                    <span className="text-blue-800 dark:text-blue-200">
                        1. Send the amount you wish to deposit to the wallet address provided.
                        <br />
                        2. Take a screenshot of your transaction confirmation.
                        <br />
                        3. Enter the amount and upload the proof of payment below.
                    </span>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                    Deposit request submitted successfully
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700"
                        placeholder="Enter amount"
                        required
                    />
                    {minimumDeposit && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Minimum deposit: ${minimumDeposit}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Proof of Payment
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setProofOfPayment(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500 dark:text-gray-400
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            dark:file:bg-blue-900/20 dark:file:text-blue-300
                            hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
                        accept="image/*"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#277771] 
                         text-white rounded-md hover:from-[#277771] hover:to-[#1f5d58]
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
                         transition-all duration-200 shadow-sm hover:shadow"
                >
                    {isSubmitting ? (
                        <>
                            <Loader size="small" text="" />
                            <span className="ml-2">Processing...</span>
                        </>
                    ) : (
                        'Submit Deposit'
                    )}
                </button>
            </div>
        </form>
    );
}
