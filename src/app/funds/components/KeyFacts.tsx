"use client";
import { motion } from 'framer-motion';

export default function KeyFacts() {
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
                        Key Facts
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col">
                            <h5 className="text-xl font-semibold">Minimum Investment</h5>
                            <p className="text-xl">$100,000</p>
                            <hr className="border text-gray-600 md:hidden" />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-xl font-semibold">Subscriptions</h5>
                            <p className="text-xl">Weekly</p>
                            <hr className="border text-gray-600 md:hidden" />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-xl font-semibold">Redemptions</h5>
                            <p className="text-xl">Monthly*</p>
                            <hr className="border text-gray-600 md:hidden" />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-xl font-semibold">Asset Class</h5>
                            <p className="text-xl">Crypto Assets</p>
                            <hr className="border text-gray-600 md:hidden" />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-xl font-semibold">Investor Qualifications</h5>
                            <p className="text-xl">
                                Investors must be non-U.S. persons or tax-exempt U.S.&nbsp;
                                <a href="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-3"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-[#308e87] hover:underline">
                                    accredited investors
                                </a>
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">
                                * Requires a two weeks notice period. For the first 36 months, redemptions may incur a 9% early withdrawal fee. No withdrawal fee after 36 months.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
