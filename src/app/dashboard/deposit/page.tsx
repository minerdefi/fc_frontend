'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CryptocurrencySelector } from '../../../components/dashboard/deposit/CryptocurrencySelector';
import { DepositForm } from '../../../components/dashboard/deposit/DepositForm';
import { WalletDisplay } from '../../../components/dashboard/deposit/WalletDisplay';
import { authService } from '../../../services/auth.service';

interface WalletAddress {
    cryptocurrency: string;
    network: string;
    address: string;
    qr_code: string | null;
    memo: string | null;
    status: string;
    minimum_deposit: string;
}

export default function DepositPage() {
    const [wallets, setWallets] = useState<WalletAddress[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { profile } = useAuth();

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const token = authService.getAccessToken();
                if (!token) {
                    throw new Error('No authentication token');
                }

                console.log('Fetching wallets with token:', token);  // Debug log

                const response = await fetch('https://minerdefi.pythonanywhere.com/auth/wallets/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Wallets response:', data);  // Debug log

                if (data.status === 'success') {
                    setWallets(data.data || []);
                    if (data.data && data.data.length > 0) {
                        setSelectedCrypto(data.data[0].cryptocurrency);
                    }
                } else {
                    throw new Error(data.message || 'Failed to fetch wallets');
                }
            } catch (error) {
                console.error('Error fetching wallets:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch wallets');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWallets();
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const selectedWallet = wallets.find(w => w.cryptocurrency === selectedCrypto && w.status === 'active');

    return (
        <div className="container mx-auto px-2 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Deposit Funds
            </h1>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> {/* reduced gap */}
                {/* Left Column - Cryptocurrency Selection */}
                <div className="space-y-6">
                    <CryptocurrencySelector
                        wallets={wallets}
                        selectedCrypto={selectedCrypto}
                        onSelect={setSelectedCrypto}
                    />

                    <DepositForm
                        selectedCrypto={selectedCrypto}
                        minimumDeposit={selectedWallet?.minimum_deposit}
                    />
                </div>

                {/* Right Column - Wallet Address Display */}
                <div>
                    {selectedWallet ? (
                        <WalletDisplay wallet={selectedWallet} />
                    ) : (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                            <p className="text-yellow-800 dark:text-yellow-200">
                                No active wallet available for this cryptocurrency.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
