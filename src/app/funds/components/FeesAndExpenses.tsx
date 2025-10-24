"use client";
import { motion } from 'framer-motion';

export default function FeesAndExpenses() {
    return (
        <section className="py-24 bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <div className="container mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Fees and Expenses
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
                            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Our fee model is built to align our success with yours.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Management Fee</span>
                                        <span className="text-lg font-light text-[#308e87]">0.50% per year</span>
                                    </div>
                                </div>
                                <hr className="border-gray-200 dark:border-gray-700" />
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Performance Fee</span>
                                        <span className="text-lg font-light text-[#308e87]">15% of net profits</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Only applies when investors earn positive returns, subject to a high-water mark
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                We believe in <span className="font-semibold text-[#308e87]">performance-based value creation</span> - not flat fees. When our investors grow, we grow.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
