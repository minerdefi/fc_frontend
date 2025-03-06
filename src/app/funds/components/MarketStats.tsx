"use client";
import { motion } from 'framer-motion';

export default function MarketStats() {
    return (
        <section className="py-24 bg-gradient-to-t from-gray-50 to-white dark:to-gray-900 dark:from-black">
            <div className="max-w-7xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-5"
                >
                    {[
                        { title: "MARKET PRICE*", value: "$65.71" },
                        { title: "INTRADAY NAV**", value: "$75.51" },
                        { title: "AUM†", value: "$1.98B" },
                        { title: "PRICE CHANGE TODAY", value: "0.9%" },
                        { title: "PREVIOUS DAY NAV‡", value: "$74.58" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group hover:scale-105 transition-transform duration-300"
                        >
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
                                <h6 className="text-sm font-bold text-[#308e87] dark:text-[#308e87]">{stat.title}</h6>
                                <h5 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">{stat.value}</h5>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>* Market price as of {new Date().toLocaleDateString('en-GB', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })} {new Date().toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} GMT+1.</p>
                    <p>** Intraday NAV as of {new Date().toLocaleDateString('en-GB', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })} {new Date().toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} GMT+1. Estimate calculated by FG each hour.</p>
                    <p>† Estimated AUM as of {new Date().toLocaleDateString('en-GB', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })} {new Date().toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} GMT+1; non-GAAP, unaudited.</p>
                    <p>‡ Estimated NAV per share as of {new Date().toLocaleDateString('en-GB', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })} {new Date().toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} GMT+1; non-GAAP, unaudited.</p>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                    Shares of the FG 10 Crypto Index Fund are registered with the Securities and Exchange Commission pursuant to Section 12(g) of the Securities and Exchange Act of 1934, as amended. The Shares are not registered under the Securities Act of 1933 (the "Securities Act"), the Investment Company Act of 1940 (the "Investment Company Act"), or any state securities commission or any other regulatory body. The Fund does not currently operate a redemption program.
                </p>
            </div>
        </section>
    );
}
