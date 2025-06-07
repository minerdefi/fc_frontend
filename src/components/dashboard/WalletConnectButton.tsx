'use client';

import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import wagmiConfig from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faLink, faUnlink, faCopy, faExternalLinkAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function WalletConnectButton() {
    const { address, isConnected, chain } = useAccount();
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const { data: balance } = useBalance({ address });
    const [copied, setCopied] = useState(false);

    // If wagmiConfig is not available, show a styled message
    if (!wagmiConfig) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faWallet} className="text-yellow-500 mr-3 h-5 w-5" />
                    <p className="text-yellow-700 dark:text-yellow-400">
                        Wallet connection is not available: Missing WalletConnect Project ID
                    </p>
                </div>
            </div>
        );
    }

    const copyToClipboard = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shortenAddress = (addr: string | null | undefined): string => {
        if (!addr) return '';
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const getBlockExplorerLink = () => {
        if (!address || !chain?.blockExplorers?.default) return '#';
        try {
            return `${chain.blockExplorers.default.url}/address/${address}`;
        } catch (e) {
            console.error("Error getting block explorer link:", e);
            return '#';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">


            {isConnected ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Wallet Info */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Connected Wallet
                                </h3>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="mr-1 h-3 w-3" />
                                    Connected
                                </span>
                            </div>

                            <div className="flex items-center mb-3">
                                <div className="text-gray-900 dark:text-white font-mono text-sm mr-2">
                                    {shortenAddress(address)}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    title="Copy address"
                                >
                                    <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} className="h-4 w-4" />
                                </button>
                                <a
                                    href={getBlockExplorerLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    title="View on block explorer"
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
                                </a>
                            </div>

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>Network: <span className="font-semibold">{chain?.name || 'Unknown'}</span></p>
                                <p>Balance: <span className="font-semibold">{balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}</span></p>
                            </div>
                        </div>

                        {/* Connection Actions */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Wallet Actions
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => open()}
                                    className="w-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300 rounded-lg p-2 text-sm font-medium transition-colors flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faWallet} className="mr-2 h-4 w-4" />
                                    Manage Wallet
                                </button>
                                <button
                                    onClick={() => disconnect()}
                                    className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-700 dark:text-red-300 rounded-lg p-2 text-sm font-medium transition-colors flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faUnlink} className="mr-2 h-4 w-4" />
                                    Disconnect Wallet
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        <p>Your wallet is connected and ready for transactions. You can now interact with smart contracts and make payments through this application.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Connect your wallet to claim your Green Token – your gateway to smart and sustainable wealth!
                        </p>
                        <button
                            onClick={() => open()}
                            className="bg-[#308e87]  text-white rounded-lg py-2 px-4 font-medium transition-colors flex items-center justify-center mx-auto"
                        >
                            <FontAwesomeIcon icon={faLink} className="mr-2 h-4 w-4" />
                            Connect Wallet
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Secure Access</h4>
                            <p className="text-gray-500 dark:text-gray-400">Connect without sharing your private keys</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Multiple Chains</h4>
                            <p className="text-gray-500 dark:text-gray-400">Support for Ethereum and other networks</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Easy Management</h4>
                            <p className="text-gray-500 dark:text-gray-400">View balances and transaction history</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
