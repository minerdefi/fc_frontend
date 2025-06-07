'use client';

import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useChainId } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { verifyContractIntegrity, VerificationResult } from '@/utils/contractVerifier';

export default function ContractVerifier() {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const publicClient = usePublicClient();

    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    async function verifyContracts() {
        if (!isConnected || !publicClient) return;

        setIsVerifying(true);
        try {
            const result = await verifyContractIntegrity(publicClient, chainId);
            setVerificationResult(result);
        } catch (error) {
            console.error("Contract verification failed:", error);
        } finally {
            setIsVerifying(false);
        }
    }

    useEffect(() => {
        if (isConnected && publicClient) {
            verifyContracts();
        }
    }, [isConnected, publicClient, chainId]);

    // Don't render if not connected or no verification performed yet
    if (!isConnected || !verificationResult) {
        return null;
    }

    const hasErrors = verificationResult.errors.length > 0;
    const hasWarnings = verificationResult.warnings.length > 0;

    return (
        <div className="p-4 mb-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium flex items-center">
                    {isVerifying ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="mr-2 text-blue-500" />
                    ) : hasErrors ? (
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-red-500" />
                    ) : hasWarnings ? (
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-yellow-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                    )}
                    Contract Verification
                </h3>
                <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            </div>

            <div className="mt-3">
                {hasErrors && (
                    <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-2 rounded text-sm">
                        <p className="font-semibold">Errors:</p>
                        <ul className="list-disc pl-5">
                            {verificationResult.errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {hasWarnings && (
                    <div className="mt-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300 p-2 rounded text-sm">
                        <p className="font-semibold">Warnings:</p>
                        <ul className="list-disc pl-5">
                            {verificationResult.warnings.map((warn, i) => (
                                <li key={i}>{warn}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {!hasErrors && !hasWarnings && (
                    <div className="text-green-600 dark:text-green-400 mb-2">
                        All contracts verified successfully on network {chainId}.
                    </div>
                )}

                {/* Add a notice about ETH being disabled */}
                <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-2 rounded text-sm">
                    <p className="font-semibold flex items-center">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-yellow-600 dark:text-yellow-400" />
                        Important Notice:
                    </p>
                    <p className="ml-6 text-yellow-700 dark:text-yellow-300">
                        ETH claims have been disabled. Only ERC20 tokens can be exchanged for GREEN tokens.
                    </p>
                </div>

                {showDetails && (
                    <div className="mt-4 text-sm border-t pt-2">
                        <p className="font-semibold mb-1">Contract Details:</p>
                        <div className="grid grid-cols-1 gap-1">
                            <div><span className="font-medium">Exchange:</span> {verificationResult.info.exchangeAddress}</div>
                            <div><span className="font-medium">Token:</span> {verificationResult.info.tokenAddress}</div>
                            <div><span className="font-medium">AutoClaimer:</span> {verificationResult.info.autoClaimerAddress}</div>
                            <div><span className="font-medium">Chain ID:</span> {chainId}</div>
                        </div>

                        <button
                            onClick={verifyContracts}
                            className="mt-3 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >
                            Verify Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
