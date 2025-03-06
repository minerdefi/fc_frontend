"use client";
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative text-center min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: "url('/images/fundbg.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                <div className="max-w-4xl mx-auto    p-4">
                    <motion.h6
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg mb-2 font-semibold text-[#308e87]"
                    >
                        Pseudo Publicly Traded
                    </motion.h6>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight sm:leading-snug lg:leading-snug text-gray-100 mt-2">
                        FG Premium 10 Crypto Index Fund
                    </h1>
                    <div className="mt-4">
                        <p className="text-xl font-light text-gray-300">
                            A secure way to get diversified exposure to bitcoin and leading cryptocurrencies. The Fund seeks to track an Index comprised of the 10 most highly valued cryptocurrencies, screened and monitored for certain risks, weighted by market capitalization, and rebalanced monthly. The fund provides the security and simplicity of a traditional investment vehicle, with shares traded in blockchain brokerage accounts using ticker "FGTX."
                        </p>
                    </div>
                    <div className="mt-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/register"
                            className="inline-block bg-white text-black dark:bg-white dark:text-black font-medium py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
                        >
                            Invest Now
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
