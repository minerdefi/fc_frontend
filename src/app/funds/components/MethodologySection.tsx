"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MethodologySection() {
    const advisors = [
        {
            name: "Douglas Bogart",
            title: "Managing Director and Head of Research at Blockchain Capital",
            previous: "Previously VP of Equity Research at Needham & Company.",
            image: "douglas-bogart.png"
        },
        {
            name: "Spencer Dash",
            title: "Senior Strategic Advisor",
            previous: "Previously Global Head of Index Business at Bloomberg LP. Before that, Managing Director and Global Head of Research & Design at Standard & Poor's.",
            image: "spencer-dash.png"
        }
    ];

    return (
        <div className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
            <div className="container mx-auto px-8">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Methodology
                        </h2>
                        <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                            The FG Crypto Indexes follow clear, rules-based processes to make them both investable and replicable. The methodologies take into account crypto-native factors surrounding liquidity, security, regulatory status, market representation, network distributions, and more.
                        </p>
                        <ul className="list-disc ml-4 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
                            <li>The most valuable assets rebalanced monthly</li>
                            <li>Robust diligence of eligibility criteria</li>
                            <li>24/7 monitoring for sudden events</li>
                        </ul>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#"
                            className="inline-flex items-center px-6 py-3 rounded-full border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white dark:text-[#308e87] dark:hover:text-white transition-all duration-300 font-semibold group"
                        >
                            VIEW METHODOLOGY
                            <svg
                                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </motion.div>

                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Index Advisory Board
                        </h2>
                        {advisors.map((advisor, index) => (
                            <motion.div
                                key={advisor.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start space-x-4 mb-6"
                            >
                                <Image
                                    src={`/images/${advisor.image}`}
                                    alt={advisor.name}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{advisor.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{advisor.title}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{advisor.previous}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
