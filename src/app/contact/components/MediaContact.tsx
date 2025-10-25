"use client";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function MediaContact() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg p-8 lg:p-10 h-fit"
        >
            <div className="mb-8">
                <h3 className="font-bold titillium-web-semibold text-3xl mb-6 text-gray-800 dark:text-gray-200">
                    MEDIA CONTACT
                </h3>
                <div className="flex items-center mb-6">
                    <div className="relative w-20 h-20 mr-4">
                        <Image
                            src="/images/test3.jpg"
                            alt="Michelle Elena Robert"
                            fill
                            className="rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                    <div>
                        <strong className="block text-xl text-gray-800 dark:text-gray-200">
                            Michelle Elena Robert
                        </strong>
                        <span className="text-gray-600 dark:text-gray-400">
                            Partner, Head of Communications
                        </span>
                    </div>
                </div>
                <hr className="border-t-2 border-stone-600 mb-6" />
                <div className="flex space-x-6">
                    {[

                      

                        { icon: faEnvelope, href: "mailto:support@fgpremiumfunds.com" }
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300"
                        >
                            <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
