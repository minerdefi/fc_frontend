'use client';

import { useState } from 'react';
import { useAccount, useChainId, useConnectors } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faCode, faInfoCircle, faList, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

export default function WalletDebug() {
    const { address, isConnected, connector } = useAccount();
    const chainId = useChainId();
    const connectors = useConnectors();
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Get environment variables
    const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.substring(0, 5) + '...';
    const moralisApiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY?.substring(0, 5) + '...';

    return (
        <div className="fixed bottom-4 left-4 z-50 text-xs">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
            >
                <FontAwesomeIcon icon={faWrench} />
            </button>

            {isOpen && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-64">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-sm">Wallet Connection Debug</h3>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <FontAwesomeIcon icon={showDetails ? faList : faInfoCircle} />
                        </button>
                    </div>

                    {!showDetails ? (
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status:</span>
                                <span className={isConnected ? "text-green-500" : "text-red-500"}>
                                    {isConnected ? "Connected" : "Disconnected"}
                                </span>
                            </div>

                            {isConnected && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Address:</span>
                                        <span className="truncate max-w-[140px]">{address}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Network:</span>
                                        <span>{chainId === 1 ? "Mainnet" : chainId === 11155111 ? "Sepolia" : chainId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Connector:</span>
                                        <span>{connector?.name || "Unknown"}</span>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-500">Project ID:</span>
                                <span>{walletConnectProjectId || "Not set"}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="font-semibold flex items-center">
                                <FontAwesomeIcon icon={faNetworkWired} className="mr-1" />
                                Available Connectors:
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                                {connectors.map((c) => (
                                    <li key={c.uid}>
                                        {c.name}
                                        {c.uid === connector?.uid && " (active)"}
                                    </li>
                                ))}
                            </ul>

                            <div className="font-semibold mt-2 flex items-center">
                                <FontAwesomeIcon icon={faCode} className="mr-1" />
                                Environmental Variables:
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                                <div>WALLETCONNECT: {walletConnectProjectId || "❌"}</div>
                                <div>MORALIS: {moralisApiKey || "❌"}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
