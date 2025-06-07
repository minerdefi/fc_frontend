'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from './DashboardLayout';
import WalletOverview from './WalletOverview';
import TokenClaim from './TokenClaim';
import ConnectWalletPrompt from '@/components/common/ConnectWalletPrompt';
import WalletErrorBoundary from '@/components/common/WalletErrorBoundary';
import ContractVerifier from '@/components/common/ContractVerifier';

export default function Dashboard() {
    const { isConnected } = useAccount();
    const [claimSuccess, setClaimSuccess] = useState(false);

    const handleClaimSuccess = () => {
        setClaimSuccess(true);
        // Reset after 5 seconds
        setTimeout(() => setClaimSuccess(false), 5000);
    };

    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';

    return (
        <DashboardLayout>
            {isConnected ? (
                <div className="w-full max-w-6xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

                    {claimSuccess && (
                        <div className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">Your GREEN tokens have been claimed.</span>
                        </div>
                    )}

                    {/* Add the contract verifier in development mode */}
                    {isDev && <ContractVerifier />}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <WalletErrorBoundary>
                                <WalletOverview />
                            </WalletErrorBoundary>
                        </div>

                        <div className="lg:col-span-2">
                            <WalletErrorBoundary>
                                <TokenClaim onSuccess={handleClaimSuccess} />
                            </WalletErrorBoundary>
                        </div>
                    </div>
                </div>
            ) : (
                <ConnectWalletPrompt
                    title="Connect Your Wallet"
                    description="Connect your wallet to access the dashboard and claim GREEN tokens."
                    icon={<FontAwesomeIcon icon={faWallet} className="text-4xl text-blue-500 mb-4" />}
                />
            )}
        </DashboardLayout>
    );
}
