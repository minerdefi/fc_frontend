"use client";
import { motion } from 'framer-motion';
import CryptoLogo from '../../components/CryptoLogo';
import { useEffect, useState } from 'react';

interface Holding {
    name: string;
    logo: string;
    weight: string;
    marketCap: string;
    price: string;
    change: string;
    isPositive: boolean;
}

interface FundHoldingsProps {
    initialHoldings: Holding[];
}

export default function FundHoldings({ initialHoldings }: FundHoldingsProps) {
    const [cryptoHoldings, setCryptoHoldings] = useState<Holding[]>(initialHoldings);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,cardano,avalanche,chainlink,sui,polkadot,litecoin&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
                );
                const data = await response.json();

                const cryptoMapping = {
                    bitcoin: { name: "Bitcoin", logo: "BTC.svg", weight: "70.8%" },
                    ethereum: { name: "Ethereum", logo: "ETH.svg", weight: "15.2%" },
                    solana: { name: "Solana", logo: "SOL.svg", weight: "3.2%" },
                    ripple: { name: "XRP", logo: "XRP.svg", weight: "2.4%" },
                    cardano: { name: "Cardano", logo: "ADA.svg", weight: "2.1%" },
                    avalanche: { name: "Avalanche", logo: "AVAX.svg", weight: "1.8%" },
                    chainlink: { name: "Chainlink", logo: "LINK.svg", weight: "1.6%" },
                    sui: { name: "Sui", logo: "SUI.svg", weight: "1.2%" },
                    polkadot: { name: "Polkadot", logo: "DOT.svg", weight: "1.0%" },
                    litecoin: { name: "Litecoin", logo: "LTC.svg", weight: "0.7%" }
                };

                interface CryptoValues {
                    usd: number;
                    usd_market_cap: number;
                    usd_24h_change: number;
                }

                const updatedHoldings = Object.entries(data).map(([id, values]) => ({
                    name: cryptoMapping[id as keyof typeof cryptoMapping].name,
                    logo: cryptoMapping[id as keyof typeof cryptoMapping].logo,
                    weight: cryptoMapping[id as keyof typeof cryptoMapping].weight,
                    marketCap: `$${(values as CryptoValues).usd_market_cap.toLocaleString()}`,
                    price: `$${(values as CryptoValues).usd.toLocaleString()}`,
                    change: `${(values as CryptoValues).usd_24h_change.toFixed(1)}%`,
                    isPositive: (values as CryptoValues).usd_24h_change > 0
                }));

                setCryptoHoldings(updatedHoldings);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Fund Holdings*
                    </h2>
                    <div className="overflow-hidden rounded-sm shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Weight
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Market Cap
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Change (24hr)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {cryptoHoldings.map((holding: Holding, index: number) => (
                                        <motion.tr
                                            key={holding.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                                <CryptoLogo
                                                    symbol={holding.logo.replace('.svg', '')}
                                                    name={String(holding.name)}
                                                    className="mr-3"
                                                />
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    {holding.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                {holding.weight}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                {holding.marketCap}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                                {holding.price}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap ${holding.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {holding.change}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

