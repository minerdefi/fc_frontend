import Image from 'next/image';

const CRYPTO_IMAGES: { [key: string]: string } = {
    BTC: '/images/btc.png',
    ETH: '/images/eth.png',
    USDT: '/images/usdt.png',
    BCH: '/images/bch.png',
    BNB: '/images/bnb.png',
    MATIC: '/images/matic.png',
    SOL: '/images/sol.png'
};

interface CryptocurrencySelectorProps {
    wallets: any[];
    selectedCrypto: string;
    onSelect: (crypto: string) => void;
}

export function CryptocurrencySelector({ wallets, selectedCrypto, onSelect }: CryptocurrencySelectorProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Cryptocurrency
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wallets.map((wallet) => (
                    <button
                        key={wallet.cryptocurrency}
                        onClick={() => onSelect(wallet.cryptocurrency)}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all
                            ${selectedCrypto === wallet.cryptocurrency
                                ? 'border-[#308e87] bg-[#308e87]/5 dark:bg-[#308e87]/10'
                                : 'border-gray-200 dark:border-gray-700 hover:border-[#308e87]/50 dark:hover:border-[#308e87]/50'
                            }
                        `}
                    >
                        <div className="w-12 h-12 mb-3 relative">
                            <Image
                                src={CRYPTO_IMAGES[wallet.cryptocurrency] || '/images/crypto/default.png'}
                                alt={wallet.cryptocurrency}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {wallet.cryptocurrency}
                        </span>
                        {wallet.status === 'maintenance' && (
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                                Maintenance
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
