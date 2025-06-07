'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCoins, faSync, faCircleNotch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { knownTokens } from '@/utils/knownTokens';
import { useTokenBalances } from '@/hooks/useTokenBalances';
import { Token } from '@/types/tokens';

export default function WalletOverview() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Define commonly used tokens to check
    const tokensToCheck: Token[] = [
        { ...knownTokens.ETH, isNative: true, requiredAmount: 1 } as Token,
        { ...knownTokens.USDC, requiredAmount: 1 } as Token,
        { ...knownTokens.USDT, requiredAmount: 1 } as Token,
        { ...knownTokens.DAI, requiredAmount: 1 } as Token,
    ];

    // Fetch token balances using the custom hook
    const { balances, isLoading, error, refresh } = useTokenBalances({
        tokens: tokensToCheck,
        refreshInterval: 30000, // 30 seconds
    });

    // Directly use useBalance hook for ETH as a fallback
    const {
        data: ethBalance,
        isError: isEthError,
        refetch: refetchEth
    } = useBalance({
        address,
        query: {
            enabled: isConnected
        }
    });

    // Manual refresh function for all balances
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refresh();
            await refetchEth();
        } catch (error) {
            console.error('Error refreshing balances:', error);
        } finally {
            setTimeout(() => setIsRefreshing(false), 500); // Minimum visual feedback
        }
    };

    if (!isConnected) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">
                <div className="flex items-center justify-center py-4">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faWallet} className="text-gray-400 text-4xl mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">Connect your wallet to see your balances</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FontAwesomeIcon icon={faWallet} className="mr-2 text-blue-500" />
                    Wallet Overview
                </h2>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                    <FontAwesomeIcon icon={isRefreshing ? faCircleNotch : faSync} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
            </div>

            {(isLoading && !isRefreshing) ? (
                <div className="flex justify-center py-8">
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-blue-500 text-2xl" />
                </div>
            ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                        <p>Error loading wallet balances. Please try again later.</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="space-y-3">
                        {/* Directly show ETH balance from useBalance as fallback if balances hook fails */}
                        {ethBalance && (!balances || balances.length === 0) && (
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                                        <FontAwesomeIcon icon={faCoins} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">ETH</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Ethereum</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{parseFloat(ethBalance.formatted).toFixed(6)}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">≈ ${(parseFloat(ethBalance.formatted) * 3500).toFixed(2)}</p>
                                </div>
                            </div>
                        )}

                        {/* Show balances from custom hook */}
                        {balances && balances.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                                        <FontAwesomeIcon icon={faCoins} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.token.symbol}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.token.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{item.amount.toFixed(6)}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {/* Simple mock price calculation for display */}
                                        ≈ ${item.token.symbol === 'ETH'
                                            ? (item.amount * 3500).toFixed(2)
                                            : ['USDC', 'USDT', 'DAI'].includes(item.token.symbol)
                                                ? item.amount.toFixed(2)
                                                : (item.amount * 1.5).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Empty state */}
                        {balances && balances.length === 0 && (
                            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faCoins} className="text-gray-300 dark:text-gray-600 text-4xl mb-3" />
                                <p>No tokens found in your wallet</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Connected address:</span>
                            <span className="font-mono text-gray-700 dark:text-gray-300">
                                {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-500 dark:text-gray-400">Network:</span>
                            <span className="text-gray-700 dark:text-gray-300">
                                {chainId === 1 ? 'Ethereum Mainnet' :
                                    chainId === 11155111 ? 'Sepolia Testnet' :
                                        `Chain ID: ${chainId}`}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
