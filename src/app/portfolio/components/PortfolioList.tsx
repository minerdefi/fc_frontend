"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolioData';

export default function PortfolioList() {
    const [expandedMobileRows, setExpandedMobileRows] = useState<Set<number>>(new Set());

    const toggleDetails = (index: number) => {
        const newSet = new Set(expandedMobileRows);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setExpandedMobileRows(newSet);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="overflow-x-auto">
                <table className="min-w-full border-2 border-gray-300 dark:border-gray-700">
                    <tbody>
                        {portfolioData.map((company, index) => (
                            <>
                                <motion.tr
                                    key={`row-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="cursor-pointer hover:shadow-lg dark:hover:shadow-xl border-t border-b border-gray-300 dark:border-gray-700"
                                    onClick={() => toggleDetails(index)}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center">
                                            <img src={company.logo} alt={`${company.name} Logo`} className="ml-4 h-12 dark:invert-0" />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 hidden md:table-cell">
                                        <p className="text-lg text-gray-700 dark:text-gray-300">
                                            {company.description}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex space-x-4">
                                            {company.twitter && (
                                                <a href={company.twitter} target="_blank" rel="noopener noreferrer"
                                                    className="hover:text-[#308e87] transition-colors">
                                                    <i className="fa-brands fa-x-twitter"></i>
                                                </a>
                                            )}
                                            <a href={company.website} target="_blank" rel="noopener noreferrer"
                                                className="hover:text-[#308e87] transition-colors">
                                                Website
                                            </a>
                                        </div>
                                    </td>
                                </motion.tr>
                                <tr className="md:hidden border-t border-b border-gray-300 dark:border-gray-700">
                                    <td colSpan={3} className={`px-8 py-6 ${expandedMobileRows.has(index) ? '' : 'hidden'}`}>
                                        <p className="text-lg text-gray-700 dark:text-gray-300">
                                            {company.description}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>

                <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                        <b className="font-semibold">Disclosure:</b> Any investments or portfolio companies mentioned, referred to, or described on this page are not representative of all investments in vehicles managed by Forbes Capital and there can be no assurance that the investments will be profitable or that other investments made in the future will have similar characteristics or results.
                    </p>
                    {/* ...rest of the disclosure text... */}
                </div>
            </div>
        </motion.div>
    );
}
