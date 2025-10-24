"use client";
import { motion } from 'framer-motion';

export default function InvestSection() {
    return (
        <section className="py-24 bg-gray-700 dark:bg-gray-800 ">
            <div className="container mx-auto px-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-black dark:bg-gray-300 bg-clip-text text-transparent mb-6">
                        Start your journey in F&G Premium Fund today
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-white dark:text-gray-300">
                        The FG 10 Blockchain Index Fund is a smart and convenient way to invest in the cryptocurrency market. It currently has a $300,000 minimum investment.
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/dashboard"
                        className="inline-flex items-center px-8 py-3 rounded-full border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white dark:text-[#308e87] dark:hover:text-white transition-all duration-300 font-semibold group"
                    >
                        Invest Now
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
            </div>
        </section>
    );
}
