import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCoins, faUsers, faChartLine, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

interface MethodologyContentProps {
    toggleSidebar: () => void;
}

export default function MethodologyContent({ toggleSidebar }: MethodologyContentProps) {
    return (
        <div className="main-content w-full p-4 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    FG Premium Crypto Asset Index Methodology
                </h1>
                <button onClick={toggleSidebar} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                    {
                        icon: faCoins,
                        title: "Eligible Crypto Assets",
                        description: "Crypto assets must meet stringent criteria prior to inclusion in our indexes."
                    },
                    {
                        icon: faUsers,
                        title: "Index Committee",
                        description: "The FG Premium Crypto Indexes are supported and maintained by industry experts."
                    },
                    {
                        icon: faChartLine,
                        title: "Eligible Exchanges",
                        description: "Crypto asset exchanges must meet certain criteria to be included in index methodology."
                    },
                    {
                        icon: faLayerGroup,
                        title: "Investable Indexes",
                        description: "The FG Premium Crypto Indexes include large cap, mid cap, small cap and total market indexes."
                    }
                ].map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <FontAwesomeIcon icon={card.icon} className="text-2xl text-[#308e87]" />
                            </div>
                            <h3 className="text-xl font-bold">{card.title}</h3>
                        </div>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">{card.description}</p>
                        <motion.a
                            whileHover={{ x: 4 }}
                            href="#"
                            className="inline-flex items-center text-[#308e87] font-medium hover:opacity-80 transition-opacity"
                        >
                            Jump to <span className="ml-1">→</span>
                        </motion.a>
                    </motion.div>
                ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
                {/* Section I */}
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        I. Guiding Principles and Indexing Approach
                    </h2>
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        {/* ...existing content... */}
                    </div>
                </div>

                {/* Section II */}
                <div className="bg-white/80 dark:bg-gray-800/80 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        II. Governance
                    </h2>
                    <div className="space-y-6">
                        {/* ...existing content... */}
                    </div>
                </div>
            </div>
        </div>
    );
}
