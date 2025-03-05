'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center mb-4">
                            <Image
                                src="/images/fc1.png"
                                alt="FG Premium Funds"
                                width={40}
                                height={40}
                                className="dark:invert"
                            />
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Pioneering institutional-grade digital asset investments for tomorrow's economy.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/blog" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-base text-gray-500 hover:text-[#308e87] transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-base text-gray-500">
                            © {new Date().getFullYear()} FG Premium Funds. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-[#308e87] transition-colors">
                                <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#308e87] transition-colors">
                                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#308e87] transition-colors">
                                <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#308e87] transition-colors">
                                <FontAwesomeIcon icon={faDiscord} className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
