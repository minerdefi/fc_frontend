'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    txHash?: string;
    status: 'pending' | 'success' | 'error';
    errorMessage?: string;
    chainId: number;
}

export default function TransactionModal({
    isOpen,
    onClose,
    txHash,
    status,
    errorMessage,
    chainId
}: TransactionModalProps) {
    if (!isOpen) return null;

    const getExplorerUrl = () => {
        const baseUrl =
            chainId === 1 ? 'https://etherscan.io' :  // Ethereum Mainnet
                chainId === 137 ? 'https://polygonscan.com' : // Polygon Mainnet
                    chainId === 56 ? 'https://bscscan.com' : // BSC Mainnet
                        chainId === 43114 ? 'https://snowtrace.io' : // Avalanche Mainnet
                            chainId === 42161 ? 'https://arbiscan.io' : // Arbitrum Mainnet
                                chainId === 10 ? 'https://optimistic.etherscan.io' : // Optimism Mainnet
                                    chainId === 11155111 ? 'https://sepolia.etherscan.io' : // Sepolia Testnet
                                        'https://etherscan.io'; // Default to Ethereum

        return txHash ? `${baseUrl}/tx/${txHash}` : baseUrl;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Transaction Status
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-6">
                    {status === 'pending' && (
                        <>
                            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600 dark:text-blue-400 h-8 w-8" />
                            </div>
                            <p className="text-center text-gray-700 dark:text-gray-300">
                                Your transaction is being processed. This may take a moment.
                            </p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faCheck} className="text-green-600 dark:text-green-400 h-8 w-8" />
                            </div>
                            <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
                                Transaction successful!
                            </p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 dark:text-red-400 h-8 w-8" />
                            </div>
                            <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
                                Transaction failed.
                            </p>
                            {errorMessage && (
                                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg text-red-700 dark:text-red-300 text-sm mt-2 max-h-24 overflow-auto">
                                    {errorMessage}
                                </div>
                            )}
                        </>
                    )}

                    {txHash && (
                        <div className="mt-4 w-full">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                Transaction Hash:
                            </p>
                            <a
                                href={getExplorerUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:text-blue-700 break-all block"
                            >
                                {txHash}
                            </a>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
