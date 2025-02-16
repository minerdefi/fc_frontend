"use client";
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

export default function TermsPage() {
    const sections = [
        {
            title: "1.0 Acceptance of the Terms and Conditions.",
            content: [
                "1.1 Forbes Capital Management, LLC and its affiliates (herein referred to as \"Forbes Capital,\" \"we,\" \"us\" or \"our\") provide and make available this website (\"Site\") and its associated services, including email newsletters, associated content distribution platforms, and public Forbes Capital online social media accounts (the Site and the associated services collectively referred to as the \"Services\"). All use of the Services is subject to the terms and conditions contained in this Terms of Use Agreement (the \"Agreement\"). Please read this Agreement carefully. By accessing, browsing or otherwise using the Services, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you do not accept the terms and conditions of this Agreement, you shall not access, browse or use the Site or the Services.",
                "Except as otherwise noted on the Services, all content and material on the Services — including information, photos, podcasts, blog posts, videos, graphics/charts, icons, code, design, and overall appearance — are the property of Forbes Capital and should not be used, modified, or reproduced without our prior written consent. All trademarks, trade names, and logos displayed on the Services are the property of Forbes Capital, its affiliates, or their respective third-party owners, and the Services grants no license to them. Forbes Capital is a pending trademark in the United States and other countries and may not be used without the prior written permission of Forbes Capital."
            ]
        },
        {
            title: "2.0 Use of the Services.",
            content: [
                "2.1 Forbes Capital may provide content through the Services that is copyrighted or proprietary. You may not copy, reproduce, distribute, or create derivative works of such content without Forbes Capital's express permission.",
                "2.2 You agree that you will not use the Services in any manner that could damage, disable, overburden, or impair the Services or interfere with any other party's use and enjoyment of the Services. You also agree not to attempt to gain unauthorized access to any parts of the Services, or any accounts, computer systems, or networks connected to the Services, through hacking, password mining, or any other means."
            ]
        },
        {
            title: "3.0 Disclaimers and Limitation of Liability.",
            content: [
                "3.1 The Services are provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
                "3.2 In no event shall Forbes Capital or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the Services, even if Forbes Capital has been advised of the possibility of such damages."
            ]
        },
        {
            title: "4.0 Indemnification.",
            content: [
                "4.1 You agree to indemnify, defend, and hold harmless Forbes Capital, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of the Services."
            ]
        },
        {
            title: "5.0 Changes to the Agreement.",
            content: [
                "5.1 Forbes Capital reserves the right to modify this Agreement at any time. Any changes to this Agreement will be effective immediately upon posting. Your continued use of the Services after any such changes are posted constitutes your acceptance of the new Agreement."
            ]
        },
        {
            title: "6.0 Governing Law.",
            content: [
                "6.1 This Agreement and any disputes arising out of or related to the Agreement or the Services will be governed by the laws of the State of New York without regard to its conflict of law principles."
            ]
        },
        {
            title: "7.0 Contact Information.",
            content: [
                "7.1 If you have any questions about this Agreement, please contact us at support@forbespartners.org."
            ]
        }
    ];

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12"
                >
                    <section className="p-4 max-w-7xl mx-auto text-base titillium-web-light">
                        <div className="container mx-auto">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl sm:text-3xl font-normal mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                            >
                                Terms of Use Agreement
                            </motion.h1>

                            <div className="space-y-8">
                                {sections.map((section, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="space-y-4"
                                    >
                                        <h2 className="text-2xl font-semibold titillium-web-semibold text-gray-900 dark:text-gray-100 mt-4">
                                            {section.title}
                                        </h2>
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </PageLayout>
    );
}
