import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { QRCodeSVG } from 'qrcode.react';

interface WalletDisplayProps {
    wallet: {
        cryptocurrency: string;
        network: string;
        address: string;
        memo: string | null;
    };
}

export function WalletDisplay({ wallet }: WalletDisplayProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Wallet Details
            </h2>

            <div className="space-y-6">
                <div className="flex justify-center bg-white p-4 rounded-lg">
                    <QRCodeSVG
                        value={wallet.address}
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Network
                        </label>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {wallet.network}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Wallet Address
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={wallet.address}
                                readOnly
                                className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md"
                            />
                            <button
                                onClick={() => copyToClipboard(wallet.address)}
                                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <FontAwesomeIcon
                                    icon={copied ? faCheck : faCopy}
                                    className={copied ? "text-green-500" : ""}
                                />
                            </button>
                        </div>
                    </div>

                    {wallet.memo && (
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Memo (Required)
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={wallet.memo}
                                    readOnly
                                    className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md"
                                />
                                <button
                                    onClick={() => copyToClipboard(wallet.memo!)}
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <FontAwesomeIcon
                                        icon={copied ? faCheck : faCopy}
                                        className={copied ? "text-green-500" : ""}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
