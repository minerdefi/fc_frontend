"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OurFirm() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
            <div className="container mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                            >
                                The Fund
                            </motion.h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p className="mb-4">
                                    FG Premium is a thesis-driven high performance fund created to deliver more advanced products and value to business, premuim and partner customers of the broader firm  that invests in cryptocurrencies, tokens, and blockchain companies reshaping trillion-dollar markets. We manage a hedge fund and several venture funds, investing across both public and private markets.
                                </p>
                                <p className="mb-4">
                                    Since founding the firm in May 2017, we've developed a reputation for being forward-leaning, independent thinkers. We are known for pioneering token economic models, valuation methodologies, and challenging long-standing assumptions that the crypto ecosystem takes for granted.
                                </p>
                                <p className="mb-4">
                                    Crypto is the first inherently global asset class, and the team covers activity around the world.
                                </p>
                                <p className="mb-4">
                                    As a crypto-native fund, we actively engage and participate in the networks we invest in. Moreover, we are intimately familiar with the crypto technology landscape and market structure. We are hands-on investors and will do everything in our power to maximize the success of our portfolio companies.
                                </p>
                                <p className="mb-4">
                                    Today, we manage long-duration capital on behalf of storied venture capital funds, family offices, institutions, and high net-worth individuals.
                                </p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/fronttall.png"
                                    alt="Our Firm"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#308e87]/10 rounded-full blur-3xl"></div>
                            <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#308e87]/10 rounded-full blur-3xl"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
