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
                    className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12"
                >
                    <section className="p-4 max-w-7xl mx-auto text-base titillium-web-light">
                        <div className="mx-auto">
                            <div className="w-full">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl sm:text-3xl font-normal mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                >
                                    Privacy Policy
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6 text-gray-700 dark:text-gray-300"
                                    style={{ textAlign: 'justify' }}
                                >
                                    <p>Our Policy: Welcome to the website (the "Site") of FG Premium Funds Management, LLC ("FG Premium Funds", "we", "us" and/or "our"). This Site is operated by FG Premium Funds and has been created to provide information about our company and the services we offer, including our financial insights blog and podcast (together with the Site, the "Services") to our Services visitors and users ("you", "your"). This Privacy Policy sets forth our policy with respect to information including personally identifiable data ("Personal Data") and other information that is collected from visitors to the Site and Services.</p>

                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Information We Collect</h2>
                                    <p>When you interact with us through the Services, we may collect Personal Data and other information from you, as further described below:</p>

                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Personal Data That You Provide</h2>
                                    <p>We collect Personal Data from you when you voluntarily provide such information, such as when you sign up for our mailing list or contact us with inquiries. By voluntarily providing us with Personal Data, you are consenting to our use of it in accordance with this Privacy Policy.</p>

                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Other Information</h2>
                                    <p>Non-Identifiable Data: When you interact with FG Premium Funds through the Services, we receive and store certain personally non-identifiable information. Such information, which is collected passively using various technologies, cannot presently be used to specifically identify you.</p>

                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-4">Cookies</h3>
                                        <p>In operating the Services, we may use a technology called "cookies." A cookie is a piece of information that the computer that hosts our Services gives to your browser when you access the Services. Our cookies help provide additional functionality to the Services and help us analyze Services usage more accurately. On most web browsers, you will find a "help" section on the toolbar. Please refer to this section for information on how to receive notification when you are receiving a new cookie and how to turn cookies off.</p>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-4">Analytics and Tracking Technologies</h3>
                                        <p>We may, and we may allow third party service providers to, use cookies or other tracking technologies to collect information about your browsing activities over time and across different websites. For example, we use Google Analytics. For more information, visit:</p>
                                        <Link
                                            href="https://www.google.com/policies/privacy/partners/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#308e87] hover:text-[#308e87]/80 transition-colors"
                                        >
                                            www.google.com/policies/privacy/partners/
                                        </Link>
                                    </div>

                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Our Use of Your Information</h2>
                                    <p>We use the Personal Data you provide in a manner that is consistent with this Privacy Policy. If you provide Personal Data for a certain reason, we may use the Personal Data in connection with the reason for which it was provided.</p>

                                    <ul className="list-disc ml-8 space-y-2 mt-4">
                                        <li>To administer a survey, promotion or other Service feature</li>
                                        <li>To allow us to better respond to your requests</li>
                                        <li>To troubleshoot problems with the Services</li>
                                        <li>To enforce our Terms of Use</li>
                                        <li>To detect and protect against error, fraud and unauthorized activities</li>
                                        <li>To provide any legitimate business service or product</li>
                                    </ul>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Security</h2>
                                    <p>FG Premium Funds takes reasonable steps to protect the Personal Data provided via the Services from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, no Internet or email transmission is ever fully secure or error free. Please keep this in mind when disclosing any Personal Data to FG Premium Funds via the Internet.</p>

                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Changes to our Privacy Policy</h2>
                                    <p>The Services and our business may change from time to time. As a result, at times it may be necessary for us to make changes to this Privacy Policy. FG Premium Funds reserves the right to update or modify this Privacy Policy at any time and from time to time without prior notice.</p>

                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <p className="italic">
                                            If you have any questions about our Privacy Policy, please contact us at:{' '}
                                            <span className="text-[#308e87]">support@fgpremiumfunds.com</span>
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </PageLayout>
    );
};

export default PrivacyPage;
