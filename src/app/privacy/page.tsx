'use client';

import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import Link from 'next/link';
import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                        <div className="p-6 md:p-8 lg:p-12">
                            <section className="p-8 max-w-7xl mx-auto lg:text-xl titillium-web-light">
                                <div className="mx-auto">
                                    <div className="w-full text-xl">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                        >
                                            Privacy Policy
                                        </motion.h1>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="space-y-6 text-gray-700 dark:text-gray-300"
                                        >
                                            <p>Our Policy: Welcome to the website (the "Site") of Forbes Capital Management, LLC ("Forbes Capital", "we", "us" and/or "our"). This Site is operated by Forbes Capital and has been created to provide information about our company and the services we offer, including our financial insights blog and podcast (together with the Site, the "Services") to our Services visitors and users ("you", "your"). This Privacy Policy sets forth our policy with respect to information including personally identifiable data ("Personal Data") and other information that is collected from visitors to the Site and Services.</p>

                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Information We Collect</h2>
                                            <p>When you interact with us through the Services, we may collect Personal Data and other information from you, as further described below:</p>

                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Personal Data That You Provide</h2>
                                            <p>We collect Personal Data from you when you voluntarily provide such information, such as when you sign up for our mailing list or contact us with inquiries. By voluntarily providing us with Personal Data, you are consenting to our use of it in accordance with this Privacy Policy.</p>

                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Other Information</h2>
                                            <p>Non-Identifiable Data: When you interact with Forbes Capital through the Services, we receive and store certain personally non-identifiable information. Such information, which is collected passively using various technologies, cannot presently be used to specifically identify you.</p>

                                            <div className="mt-6">
                                                <h3 className="text-xl font-semibold mb-4">Cookies</h3>
                                                <p>In operating the Services, we may use a technology called "cookies." A cookie is a piece of information that the computer that hosts our Services gives to your browser when you access the Services. Our cookies help provide additional functionality to the Services and help us analyze Services usage more accurately. On most web browsers, you will find a "help" section on the toolbar. Please refer to this section for information on how to receive notification when you are receiving a new cookie and how to turn cookies off.</p>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="text-xl font-semibold mb-4">Analytics and Tracking Technologies</h3>
                                                <p>We may, and we may allow third party service providers to, use cookies or other tracking technologies to collect information about your browsing activities over time and across different websites. For example, we use Google Analytics. For more information, visit:</p>
                                                <Link
                                                    href="https://www.google.com/policies/privacy/partners/"
                                                    target="_blank"
                                                    className="text-[#308e87] hover:text-[#308e87]/80 transition-colors"
                                                >
                                                    www.google.com/policies/privacy/partners/
                                                </Link>
                                            </div>

                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Our Use of Your Information</h2>
                                            <p>We use the Personal Data you provide in a manner that is consistent with this Privacy Policy. If you provide Personal Data for a certain reason, we may use the Personal Data in connection with the reason for which it was provided.</p>

                                            <ul className="list-disc ml-8 space-y-2 mt-4">
                                                <li>To administer a survey, promotion or other Service feature</li>
                                                <li>To allow us to better respond to your requests</li>
                                                <li>To troubleshoot problems with the Services</li>
                                                <li>To enforce our Terms of Use</li>
                                                <li>To detect and protect against error, fraud and unauthorized activities</li>
                                                <li>To provide any legitimate business service or product</li>
                                            </ul>

                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Security</h2>
                                            <p>Forbes Capital takes reasonable steps to protect the Personal Data provided via the Services from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, no Internet or email transmission is ever fully secure or error free. Please keep this in mind when disclosing any Personal Data to Forbes Capital via the Internet.</p>

                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Changes to our Privacy Policy</h2>
                                            <p>The Services and our business may change from time to time. As a result, at times it may be necessary for us to make changes to this Privacy Policy. Forbes Capital reserves the right to update or modify this Privacy Policy at any time and from time to time without prior notice.</p>

                                            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                                                <p className="italic">
                                                    If you have any questions about our Privacy Policy, please contact us at:{' '}
                                                    <span className="text-[#308e87]">support@forbespartners.org</span>
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    );
};

export default PrivacyPage;
