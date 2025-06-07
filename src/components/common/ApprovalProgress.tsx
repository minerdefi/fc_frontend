'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ApprovalProgressProps {
    current: number;
    total: number;
    isComplete: boolean;
    error?: string | null;
    currentToken?: string;
}

export default function ApprovalProgress({
    current,
    total,
    isComplete,
    error,
    currentToken
}: ApprovalProgressProps) {
    const [showAnimation, setShowAnimation] = useState(true);

    // Auto-hide animation after completion (with delay for visual feedback)
    useEffect(() => {
        if (isComplete && !error) {
            const timer = setTimeout(() => {
                setShowAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isComplete, error]);

    if (!showAnimation && isComplete && !error) return null;

    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl">
                <div className="text-center">
                    <div className="mb-4">
                        {error ? (
                            <div className="h-16 w-16 mx-auto flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 dark:text-red-400 text-2xl" />
                            </div>
                        ) : isComplete ? (
                            <div className="h-16 w-16 mx-auto flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400 text-2xl" />
                            </div>
                        ) : (
                            <div className="h-16 w-16 mx-auto flex items-center justify-center">
                                <FontAwesomeIcon icon={faSpinner} className="text-blue-500 dark:text-blue-400 text-3xl animate-spin" />
                            </div>
                        )}
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {error ? 'Approval Failed' :
                            isComplete ? 'Approvals Complete' :
                                'Approving Tokens...'}
                    </h3>

                    {!error && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            {isComplete
                                ? `Successfully approved ${current} of ${total} tokens`
                                : `Approving token ${current + 1} of ${total}`}
                            {currentToken ? ` (${currentToken})` : ''}
                        </p>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-700 dark:text-red-300 text-sm mb-4 max-h-24 overflow-auto">
                            {error}
                        </div>
                    )}

                    {!isComplete && !error && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {error
                            ? 'Please try again or contact support if the issue persists.'
                            : isComplete
                                ? 'You can now continue with your transaction.'
                                : 'Please confirm each transaction in your wallet.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
