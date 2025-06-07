'use client';

import { useEffect, useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Component to monitor and display wallet connection status.
 * Can be placed in app layout to provide connection feedback to users.
 */
export default function WalletConnectionCheck() {
    const { isConnected, address, status } = useAccount();
    const { data: walletClient, isError: walletClientError } = useWalletClient();
    const publicClient = usePublicClient();

    const [networkStatus, setNetworkStatus] = useState<'ok' | 'slow' | 'error'>('ok');
    const [lastBlockTime, setLastBlockTime] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Monitor network connection quality
    useEffect(() => {
        if (!isConnected) return;

        const checkNetwork = async () => {
            try {
                // Measure request time
                const start = Date.now();
                if (!publicClient) {
                    throw new Error('Public client not available');
                }
                const blockNumber = await publicClient.getBlockNumber();
                const elapsed = Date.now() - start;

                // Update network status based on response time
                if (elapsed > 3000) {
                    setNetworkStatus('slow');
                } else {
                    setNetworkStatus('ok');
                }

                setLastBlockTime(Date.now());
            } catch (error) {
                console.error('Network check error:', error);
                setNetworkStatus('error');
            }
        };

        // Initial check
        checkNetwork();

        // Schedule periodic checks
        const interval = setInterval(checkNetwork, 30000);
        return () => clearInterval(interval);
    }, [isConnected, publicClient]);

    // Show issues if they exist
    useEffect(() => {
        if (!isConnected) return;

        // Show notification if there's an issue
        if (networkStatus === 'error' || networkStatus === 'slow' || walletClientError) {
            setIsVisible(true);
        } else {
            // Auto-hide after 5 seconds if everything is ok
            const timer = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [networkStatus, isConnected, walletClientError]);

    // Don't render anything if not connected or everything is ok and not visible
    if (!isConnected || (networkStatus === 'ok' && !walletClientError && !isVisible)) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
            <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 ${networkStatus === 'error' || walletClientError
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                : networkStatus === 'slow'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                <FontAwesomeIcon
                    icon={
                        networkStatus === 'error' || walletClientError
                            ? faExclamationTriangle
                            : networkStatus === 'slow'
                                ? faWifi
                                : faCheckCircle
                    }
                    className="h-4 w-4"
                />
                <span className="text-xs font-medium">
                    {networkStatus === 'error' || walletClientError
                        ? 'Connection issue - check your wallet'
                        : networkStatus === 'slow'
                            ? 'Slow network connection'
                            : 'Wallet connected'}
                </span>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-2 text-xs opacity-70 hover:opacity-100"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
