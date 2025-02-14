"use client";
import { motion } from 'framer-motion';
import CryptoLogo from '../../components/CryptoLogo';

export default function FundHoldings() {
    const holdings = [
        {
            name: "Bitcoin",
            logo: "BTC.svg",
            weight: "70.8%",
            marketCap: "$2,040,278,997,721",
            price: "$103,119.15",
            change: "2.4%",
            isPositive: true
        },
        {
            name: "Ethereum",
            logo: "ETH.svg",
            weight: "16.7%",
            marketCap: "$468,536,593,345",
            price: "$3,890.61",
            change: "1.5%",
            isPositive: true
        },
        {
            name: "Solana",
            logo: "SOL.svg",
            weight: "3.8%",
            marketCap: "$104,628,942,385",
            price: "$220.41",
            change: "2.2%",
            isPositive: true
        },
        {
            name: "XRP",
            logo: "XRP.svg",
            weight: "4.9%",
            marketCap: "$137,141,669,273",
            price: "$2.41",
            change: "2.0%",
            isPositive: true
        },
        {
            name: "Cardano",
            logo: "ADA.svg",
            weight: "3.8%",
            marketCap: "$38,749,223,026",
            price: "$1.08",
            change: "3.5%",
            isPositive: true
        },
        {
            name: "Avalanche",
            logo: "AVAX.svg",
            weight: "0.7%",
            marketCap: "$20,512,577,287",
            price: "$50.14",
            change: "1.3%",
            isPositive: true
        },
        {
            name: "Chainlink",
            logo: "LINK.svg",
            weight: "0.6%",
            marketCap: "$17,989,340,476",
            price: "$28.70",
            change: "-0.7%",
            isPositive: false
        },
        {
            name: "Bitcoin Cash",
            logo: "BCH.svg",
            weight: "0.4%",
            marketCap: "$10,651,203,330",
            price: "$538.17",
            change: "3.3%",
            isPositive: true
        },
        {
            name: "Polkadot",
            logo: "DOT.svg",
            weight: "0.5%",
            marketCap: "$12,795,340,380",
            price: "$8.89",
            change: "6.1%",
            isPositive: true
        },
        {
            name: "NEAR Protocol",
            logo: "NEAR.svg",
            weight: "0.3%",
            marketCap: "$8,226,956,077",
            price: "$6.76",
            change: "3.8%",
            isPositive: true
        }
    ];

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
                                    {holdings.map((holding, index) => (
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
                                                    name={holding.name}
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
                                            <td className={`px-6 py-4 whitespace-nowrap ${holding.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                                }`}>
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
