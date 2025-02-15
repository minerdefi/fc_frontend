'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowTrendUp,
    faArrowTrendDown,
    faWallet,
    faChartLine,
    faCoins,
    faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import AssetDistributionChart from '../../components/dashboard/AssetDistributionChart';
import PortfolioPerformanceChart from '../../components/dashboard/PortfolioPerformanceChart';
import { authService } from '@/services/auth.service';

export default function DashboardPage() {
    const { profile } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [performanceData, setPerformanceData] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!profile) {
                console.log('No profile data after timeout');
                setIsLoading(false);
            }
        }, 5000); // 5 second timeout

        if (profile) {
            console.log('Profile loaded:', profile);
            setIsLoading(false);
        }

        return () => clearTimeout(timer);
    }, [profile]);

    useEffect(() => {
        const fetchEarningsHistory = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/earnings-history/', {
                    headers: {
                        'Authorization': `Bearer ${authService.getAccessToken()}`,
                    }
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setPerformanceData(data.data);
                }
            } catch (error) {
                console.error('Error fetching earnings history:', error);
            }
        };

        if (profile) {
            fetchEarningsHistory();
        }
    }, [profile]);

    useEffect(() => {
        const fetchRecentActivity = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/recent-activity/', {
                    headers: {
                        'Authorization': `Bearer ${authService.getAccessToken()}`,
                    }
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setRecentActivity(data.data);
                }
            } catch (error) {
                console.error('Error fetching recent activity:', error);
            }
        };

        if (profile) {
            fetchRecentActivity();
        }
    }, [profile]);

    // Add debug logging
    console.log('Dashboard profile:', profile);

    // Helper function to format currency values
    const formatCurrency = (value: string | undefined, prefix: string = '$') => {
        console.log(`Formatting currency: ${value}`); // Debug log
        if (!value) return `${prefix}0.00`;
        try {
            const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
            return `${prefix}${numericValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        } catch (error) {
            console.error('Error formatting currency:', error);
            return `${prefix}0.00`;
        }
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'deposit': return faArrowTrendUp;
            case 'withdrawal': return faArrowTrendDown;
            case 'earnings_update': return faChartLine;
            case 'ada_update': return faCoins;
            case 'tax_update': return faExchangeAlt;
            default: return faWallet;
        }
    };

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'deposit': return 'green';
            case 'withdrawal': return 'red';
            case 'earnings_update': return 'blue';
            case 'ada_update': return 'indigo';
            case 'tax_update': return 'purple';
            default: return 'gray';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Loading your dashboard...</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Unable to load profile data. Please try refreshing.</div>
            </div>
        );
    }

    const stats = [
        {
            title: "Available Balance",
            value: formatCurrency(profile?.avail_balance),
            icon: faWallet,
            color: "emerald"
        },
        {
            title: "Total Earnings",
            value: formatCurrency(profile?.earnings),
            icon: faChartLine,
            color: "blue"
        },
        {
            title: "Total Deposits",
            value: formatCurrency(profile?.total_deposits),
            icon: faArrowTrendUp,
            color: "green"
        },
        {
            title: "Total Withdrawals",
            value: formatCurrency(profile?.total_withdrawals),
            icon: faArrowTrendDown,
            color: "red"
        },
        {
            title: "ADA Balance",
            value: formatCurrency(profile?.ADA, '₳'),
            icon: faCoins,
            color: "indigo"
        },
        {
            title: "Tax Balance",
            value: formatCurrency(profile?.Tax_balance),
            icon: faExchangeAlt,
            color: "purple"
        }
    ];

    // Update getNumericValue for the pie chart
    const getNumericValue = (value: string | undefined) => {
        if (!value) return 0;
        return parseFloat(value.replace(/[^0-9.-]+/g, ''));
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid - Updated to always show 2 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4" // Adjusted padding for mobile
                    >
                        <div className="flex items-center justify-between">
                            <span className={`p-1.5 rounded-md bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                                <FontAwesomeIcon
                                    icon={stat.icon}
                                    className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`}
                                />
                            </span>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {stat.title}
                            </h3>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white mt-0.5">
                                {stat.value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Portfolio Performance Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Earnings Performance
                    </h2>
                    <div className="h-[300px]">
                        {performanceData.length > 0 ? (
                            <PortfolioPerformanceChart performanceData={performanceData} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No earnings data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Asset Distribution Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Asset Distribution
                    </h2>
                    <div className="h-[300px]">
                        <AssetDistributionChart
                            availableBalance={getNumericValue(profile?.avail_balance)}
                            adaBalance={getNumericValue(profile?.ADA)}
                            taxBalance={getNumericValue(profile?.Tax_balance)}
                            earnings={getNumericValue(profile?.earnings)}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                </h2>
                <div className="space-y-4">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className={`p-2 rounded-md bg-${getTransactionColor(activity.transaction_type)}-100 dark:bg-${getTransactionColor(activity.transaction_type)}-900/20`}>
                                        <FontAwesomeIcon
                                            icon={getTransactionIcon(activity.transaction_type)}
                                            className={`h-4 w-4 text-${getTransactionColor(activity.transaction_type)}-600 dark:text-${getTransactionColor(activity.transaction_type)}-400`}
                                        />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {activity.description}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {activity.amount}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-4">
                            No recent activity
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
