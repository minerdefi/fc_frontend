"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '../components/PageLayout';
import { blogPosts } from './data/blogData';


export default function BlogPage() {
    const post = blogPosts[0];

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                        {/* Header Section with adjusted padding */}
                        <div className="text-center p-6 md:p-8 lg:p-12 border-b border-gray-200/50 dark:border-gray-700/50">
                            <Link
                                href="#"
                                className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#308e87]/10 text-[#308e87] text-sm font-semibold hover:bg-[#308e87]/20 transition-colors"
                            >
                                {post.category}
                            </Link>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-center space-x-4">
                                <div className="flex items-center">
                                    <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-[#308e87]/20">
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                                        {post.author.name}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections with responsive padding */}
                        <div className="p-6 md:p-8 lg:p-12 space-y-12">
                            {post.sections.map((section, index) => (
                                <motion.section
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert max-w-none"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                        {section.title}
                                    </h2>

                                    <div className="space-y-6">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>

                                    {section.bullets && (
                                        <ul className="mt-6 space-y-4 list-none">
                                            {section.bullets.map((bullet, bIndex) => (
                                                <li key={bIndex} className="flex items-start">
                                                    <span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-[#308e87]" />
                                                    <span className="text-gray-700 dark:text-gray-300">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Images with enhanced styling */}
                                    {section.image && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true }}
                                            className="my-8 md:my-12 w-full max-w-3xl mx-auto px-4"
                                        >
                                            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                                                <div className="relative h-[280px] md:h-[320px] lg:h-[360px] w-full">
                                                    <Image
                                                        src={section.image.src}
                                                        alt={section.image.alt}
                                                        fill
                                                        className="object-contain p-4"
                                                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
                                                        quality={90}
                                                    />
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
                                                {section.image.alt}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.section>
                            ))}
                        </div>

                        {/* Disclaimer Section with adjusted padding */}
                        <footer className="p-6 md:p-8 lg:p-12 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50">
                            <div className="max-w-prose mx-auto">
                                <p className="mb-4 text-sm italic text-gray-600 dark:text-gray-400">
                                    {post.disclaimer.footer}
                                </p>
                                <hr className="my-6 border-gray-200/50 dark:border-gray-700/50" />
                                <div className="space-y-4 text-xs text-gray-500 dark:text-gray-400">
                                    {post.disclaimer.disclosures.map((disclosure, index) => (
                                        <p key={index} className="italic">
                                            {disclosure}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </footer>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    );
}
