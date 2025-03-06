import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                />
            )}

            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isOpen ? 0 : -300 }}
                className="sidebar bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white p-6 space-y-8 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50"
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        FGPremium®
                    </h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <nav className="space-y-8">
                    {[
                        {
                            title: "Governance",
                            items: [
                                "FG Premium Crypto Index Committee",
                                "FG Premium Crypto Index Advisory Board"
                            ]
                        },
                        {
                            title: "Eligibility Requirements",
                            items: [
                                "Crypto Asset Trading Venue Eligibility Requirements",
                                "Crypto Asset Eligibility Requirements"
                            ]
                        },
                        {
                            title: "Asset Pricing Methodology",
                            items: [
                                "Crypto Asset Prices",
                                "Treatment of Network Distributions"
                            ]
                        }
                    ].map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-3 font-medium">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="block py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </motion.aside>
        </>
    );
}
