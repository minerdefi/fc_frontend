"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faLinkedin,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-bold mb-4">Forbes Capital</h3>
                        <p className="text-sm text-gray-300 dark:text-gray-300">
                            Leading the way in investment management and financial solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/portfolio" className="text-sm text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="/funds" className="text-sm text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                    Investments
                                </Link>
                            </li>

                            <li>
                                <Link href="/terms" className="text-sm text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-300">

                            <li>support@forbespartners.org</li>

                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-300 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-colors duration-300">
                                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-sm text-gray-300 dark:text-gray-300">
                        © {new Date().getFullYear()} Forbes Capital. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
