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
                        <div className="bg-white dark:bg-gray-800  shadow-lg p-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold">Expense Ratio</span>
                                <span className="font-light">2.50%*</span>
                            </div>
                            <h6 className="mt-2">
                                Any investment &gt; $1M will have a fee break of 50 bps.
                            </h6>
                            <hr className="border text-gray-600" />
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold">Performance Fee</span>
                                <span className="font-light">0%</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800  shadow-lg p-6">
                            <p>
                                * Expense Ratio includes the management fee, custody charges for holding the fund's assets charged by the custodian, and customary fees and expenses of the fund administrator and auditor.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
