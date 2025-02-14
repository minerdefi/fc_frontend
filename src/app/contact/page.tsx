"use client";
import { motion } from 'framer-motion';
import PageLayout from "../components/PageLayout";
import ContactForm from "./components/ContactForm";
import MediaContact from "./components/MediaContact";
import Disclosure from "./components/Disclosure";

export default function ContactPage() {
    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto space-y-12"
                    >
                        <div className="grid lg:grid-cols-[1fr,420px] gap-12">
                            {/* Left Section */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                >
                                    Contact us
                                </motion.h1>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <p className="mb-4">
                                        If you're interested in investing in our funds, please fill out the form below and we'll get back to you promptly.
                                    </p>
                                    <p className="mb-4">
                                        We'd also love to hear from you if you're working on a crypto- or blockchain-related project or company. Fair warning: we get a lot of these pitches. If you can manage a warm intro that helps us to qualify you quickly. If you can't, just hold steady we'll get back to you as fast as we possibly can. If you're interested in working at Forbes Capital, please see our careers page for job opportunities. For all other inquiries, please use the form below.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Media Contact Section */}
                            <MediaContact />
                        </div>

                        {/* Contact Form Section */}
                        <ContactForm />

                        {/* Disclosure Section */}
                        <Disclosure />
                    </motion.div>
                </section>
            </div>
        </PageLayout>
    );
}
