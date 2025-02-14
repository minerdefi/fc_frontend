"use client";
import PageLayout from "../components/PageLayout";
import { motion } from 'framer-motion';
import PortfolioTable from './components/PortfolioTable';

export default function PortfolioPage() {
    return (
        <PageLayout>
            <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                            >
                                Our Portfolio
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-4"
                            >
                                In addition to managing a portfolio of liquid crypto assets, we invest in both private equity and tokens
                                for projects that have not yet launched. We invest from the seed stage and plan to support entrepreneurs
                                over multiple rounds of investment in both private and public markets.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
                            >
                                We invest in technical endeavors that push the boundaries of computer science and technology,
                                infrastructure that supports trust-minimized computation at a global scale, and consumer and
                                enterprise applications that require trust-minimized properties.
                            </motion.p>
                        </div>
                        <PortfolioTable />
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
}
