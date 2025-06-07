'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faShieldAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useChainId } from 'wagmi';

interface ContractVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    contractAddress: string;
    contractName: string;
    tokenSymbols: string[];
}

export default function ContractVerificationModal({
    isOpen,
    onClose,
    onConfirm,
    contractAddress,
    contractName,
    tokenSymbols
}: ContractVerificationModalProps) {
    const chainId = useChainId();
    const [confirmed, setConfirmed] = useState(false);

    if (!isOpen) return null;

    const getExplorerUrl = () => {
        const baseUrl =
            chainId === 1 ? 'https://etherscan.io' :
                chainId === 11155111 ? 'https://sepolia.etherscan.io' :
                    'https://etherscan.io';

        return `${baseUrl}/address/${contractAddress}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 shadow-xl">
                <div className="flex items-center mb-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className="text-yellow-600 dark:text-yellow-400 text-xl"
                        />
                    </div>
                    <h3 className="ml-3 text-xl font-medium text-gray-900 dark:text-white">
                        Security Verification
                    </h3>
                </div>

                <div className="mb-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
                        <p className="text-yellow-800 dark:text-yellow-200">
                            You are about to approve tokens to an unverified or custom smart contract.
                        </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You are approving the following tokens to <span className="font-medium">{contractName}</span>:
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                        <p className="font-mono text-sm break-all">{contractAddress}</p>
                        <div className="mt-2 space-x-2">
                            {tokenSymbols.map((symbol, index) => (
                                <span key={index} className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs">
                                    {symbol}
                                </span>
                            ))}
                        </div>
                        <a
                            href={getExplorerUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline"
                        >
                            Verify on Explorer <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1 text-xs" />
                        </a>
                    </div>

                    <div className="flex items-start mb-4">
                        <input
                            id="security-check"
                            type="checkbox"
                            className="w-4 h-4 mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                            checked={confirmed}
                            onChange={() => setConfirmed(!confirmed)}
                        />
                        <label htmlFor="security-check" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            I understand that approving tokens to an unverified contract carries risks.
                            I have verified this contract address and confirm it is secure.
                        </label>
                    </div>

                    <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-2" />
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            Only approve tokens to contracts you trust. Malicious contracts can steal your tokens.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!confirmed}
                        className={`px-4 py-2 rounded-lg transition-colors ${confirmed
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
