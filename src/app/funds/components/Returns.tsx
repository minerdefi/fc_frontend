"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Returns() {
    const [selectedPeriod, setSelectedPeriod] = useState('1-month');

    type ReturnsData = {
        [key: string]: {
            [fund: string]: string;
        };
    };

    const returnsData: ReturnsData = {
        '1-month': {
            'FG 30 Digital Assets Index Fund (NAV) *': '8.8-10.7%',
            'Secondary Market Performance (OTC: FGW)': '9.1-15%',
            'FG 10 Large Cap Digital Assets Index **': '8.8-11%',
            'Bitcoin(Reference Benchmark) ***': '8%'
        },
        '3-months': {
            'FG 30 Digital Assets Index Fund (NAV) *': '28-35%',
            'Secondary Market Performance (OTC: FGW)': '35-50%',
            'FG 10 Large Cap Digital Assets Index **': '30-36%',
            'Bitcoin(Reference Benchmark) ***': '25%'
        },
        'ytd': {
            'FG 30 Digital Assets Index Fund (NAV) *': '95-120%',
            'Secondary Market Performance (OTC: FGW)': '130-160%',
            'FG 10 Large Cap Digital Assets Index **': '100-125%',
            'Bitcoin(Reference Benchmark) ***': '90%'
        },
        '12-months': {
            'FG 30 Digital Assets Index Fund (NAV) *': '115-140%',
            'Secondary Market Performance (OTC: FGW)': '160-190%',
            'FG 10 Large Cap Digital Assets Index **': '120-145%',
            'Bitcoin(Reference Benchmark) ***': '105%'
        },
        'since-inception': {
            'FG 30 Digital Assets Index Fund (NAV) *': '620-700%',
            'Secondary Bonus Market Performance (OTC: FGW)': '-',
            'FG 10 Large Cap Digital Assets Index **': '740-800%',
            'Bitcoin(Reference Benchmark) ***': '600%'
        },
        'since-otc': {
            'FG 30 Digital Assets Index Fund (NAV) *': '368%',
            'Secondary Market Performance (OTC: FGW)': '121%',
            'FG 10 Large Cap Digital Assets Index **': '407%',
            'Bitcoin(Reference Benchmark) ***': '350%'
        }
    };

    const periodLabels = {
        '1-month': '1 Month',
        '3-months': '3 Months',
        'ytd': 'YTD',
        '12-months': '12 Months',
        'since-inception': 'Since Inception †',
        'since-otc': 'Since OTC Quotation ‡'
    };

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
                        Returns
                    </h2>
                    <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
                        As of: {new Date().toLocaleDateString('en-GB', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })} {new Date().toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })} GMT+1
                    </p>

                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                            Returns
                                        </th>
                                        {Object.entries(periodLabels).map(([key, label]) => (
                                            <th key={key} className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                {label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {Object.keys(returnsData['1-month']).map((fund) => (
                                        <tr key={fund} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                {fund}
                                            </td>
                                            {Object.keys(returnsData).map((period) => (
                                                <td key={period} className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                    {returnsData[period][fund]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="w-full mb-4 p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        >
                            {Object.entries(periodLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <table className="min-w-full">
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {Object.entries(returnsData[selectedPeriod]).map(([fund, value]) => (
                                        <tr key={fund} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                                {fund}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 text-right">
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footnotes */}
                    <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>* Fund returns are calculated net of all applicable fees and expenses. Shares are subject to an annual management fee of 0.50% and a performance fee of 15% of net profits, applied only
                                when the fund generates positive returns, subject to a high-water mark. 
                           <br></br> <br></br>These fees include custody charges for fund assets and customary administrative and audit
                            expenses.</p>
                        <p>** Performance of an index is not illustrative of any particular investment. It is not possible to invest directly in an index. Index performance does not include the fees and expenses that are charged by the Fund. Past performance is not indicative of future performance.</p>
                        <p>*** The returns of bitcoin (BTC) are historical and unaudited and do not represent the returns of an actual account. These historical returns do not include the fees and expenses that are charged by any Fund.</p>
                        <p>† FG 10 Crypto Index Fund inception date: November 22, 2017.</p>
                        <p>‡ Inception of quotation on OTC: December 9, 2020.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
