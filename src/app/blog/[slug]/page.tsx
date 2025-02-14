"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageLayout from '../../components/PageLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Disclosure from './components/Disclosure';

export default function BlogPostPage() {
    return (
        <PageLayout>
            <article className="mx-auto md:w-8/12 lg:w-7/12 p-10 pt-24">
                <div className="flex flex-col items-start">
                    {/* Category */}
                    <ul className="mb-4">
                        <li>
                            <a href="#" className="text-base text-left text-lg hover:text-[#308e87] titillium-web-semibold">
                                FEATURED
                            </a>
                        </li>
                    </ul>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold dm-serif-text-regular"
                    >
                        Crypto Mega Theses
                    </motion.h1>

                    {/* Author Info */}
                    <div className="flex items-center mt-2">
                        <div className="flex items-center">
                            <div className="w-6 h-6 overflow-hidden rounded-full">
                                <Image
                                    src="/images/test3.jpg"
                                    alt="Kyle Samani"
                                    width={24}
                                    height={24}
                                    className="object-cover"
                                />
                            </div>
                            <span className="ml-2">Kyle Samani</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto lg:text-xl titillium-web-light">
                    // ...blog content sections...
                </div>

                {/* Disclosure */}
                <Disclosure />
            </article>
        </PageLayout>
    );
}
