"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function PortfolioTable() {
    const [expandedMobileRows, setExpandedMobileRows] = useState<Set<number>>(new Set());

    const toggleDetails = (index: number) => {
        const newSet = new Set(expandedMobileRows);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setExpandedMobileRows(newSet);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg"
        >
            <div className="grid grid-cols-1 gap-4">
                {portfolioData.map((company, index) => (
                    <motion.div
                        key={company.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group bg-white/80 dark:bg-gray-800/50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                    >
                        <div
                            onClick={() => toggleDetails(index)}
                            className="cursor-pointer p-4 flex flex-col md:flex-row items-center md:items-center gap-4"
                        >
                            {/* Logo Section */}
                            <div className="w-20 md:w-32 flex justify-center md:justify-start">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="h-16 w-16 md:h-14 md:w-14 relative bg-white dark:bg-gray-700 rounded-lg p-3 shadow group-hover:shadow-md transition-all duration-300"
                                >
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} Logo`}
                                        className="h-full w-full object-contain"
                                    />
                                </motion.div>
                            </div>

                            {/* Company Info */}
                            <div className="flex-grow text-center md:text-left">
                                <motion.h3
                                    className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                >
                                    {company.name}
                                </motion.h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base hidden md:block">
                                    {company.description}
                                </p>
                            </div>

                            {/* Updated Links Section */}
                            <div className="flex items-center gap-4 ml-auto">
                                {company.twitter && (
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={company.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-gray-600 hover:text-[#308e87] dark:text-gray-400 dark:hover:text-[#308e87] transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                    >
                                        <i className="fa-brands fa-x-twitter text-xl"></i>
                                    </motion.a>
                                )}
                                <motion.a
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-6 py-2 rounded-full border border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white dark:hover:text-white transition-all duration-300 text-sm font-medium w-28 text-center flex items-center justify-center shadow hover:shadow-md"
                                >
                                    Visit Website
                                </motion.a>
                            </div>
                        </div>

                        {/* Mobile Description */}
                        <AnimatePresence>
                            {expandedMobileRows.has(index) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:hidden border-t border-gray-200 dark:border-gray-700"
                                >
                                    <div className="p-4 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                                        <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                                            {company.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Updated Disclosure Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 p-6 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
            >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Disclosure</h4>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        <b className="font-semibold">Disclosure:</b> Any investments or portfolio companies mentioned, referred to, or described on this page are not representative of all investments in vehicles managed by FG Premium and there can be no assurance that the investments will be profitable or that other investments made in the future will have similar characteristics or results.
                    </p>
                    <p>
                        Exits include current and former FG Premium portfolio companies which may have been acquired and/or where FG Premium sold tokens and/or equity. Certain portfolio companies on this list may still be held in FG Premium funds.
                    </p>
                    <p>
                        A list of investments made by funds managed by FG Premium is available here: <a href="https://fgpremiumfunds.com/main/portfolio/" target="_blank" rel="noopener noreferrer" className="text-[#308e87] hover:underline">https://fgpremiumfunds.com/main/portfolio/</a>
                    </p>
                    <p>
                        Excluded from this list are investments that have not yet been announced (1) for strategic reasons (e.g., undisclosed positions in publicly traded digital assets) or (2) due to coordination with the development team or issuer on the timing and nature of public disclosure.
                    </p>
                    <p>
                        Further, the list of investments is updated monthly and, as such, may not reflect the most recent FG Premium investments. Past results of FG Premium's investments, pooled investment vehicles, or investment strategies are not necessarily indicative of future results.
                    </p>
                    <p>
                        <b className="font-semibold">Market Data Disclosure:</b> All market data shown is as of December 13, 2024, unless otherwise noted. Past performance is not indicative of future results. Actual results may vary.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
