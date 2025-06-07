'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faKey } from '@fortawesome/free-solid-svg-icons';

export default function WalletConfigFallback() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-yellow-300 dark:border-yellow-600 p-4">
            <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 w-5 h-5" />
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Wallet Configuration Issue
                    </h3>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            Missing wallet configuration settings. Please make sure you have set the following environment variables:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                            <li>
                                <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
                                    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
                                </code>
                            </li>
                            <li>
                                <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
                                    NEXT_PUBLIC_MORALIS_API_KEY
                                </code>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <a
                            href="https://cloud.walletconnect.com/sign-in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <FontAwesomeIcon icon={faKey} className="mr-1" />
                            Get WalletConnect ID
                        </a>
                        <a
                            href="https://admin.moralis.io/settings"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <FontAwesomeIcon icon={faKey} className="mr-1" />
                            Get Moralis API Key
                        </a>
                    </div>
                </div>
                <button
                    type="button"
                    className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
