'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowTrendUp,
    faArrowTrendDown,
    faWallet,
    faChartLine,
    faCoins,
    faExchangeAlt,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/auth.service';

interface Transaction {
    transaction_type: string;
    amount: string;
    description: string;
    status: string;
    time: string;
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { profile } = useAuth();

    const fetchTransactions = async (page: number) => {
        try {
            const response = await fetch(`https://minerdefi.pythonanywhere.com/auth/transactions/?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${authService.getAccessToken()}`,
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                setTransactions(data.data.transactions);
                setTotalPages(data.data.total_pages);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage]);

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
                <div className="text-gray-500">Loading transactions...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Transaction History
            </h1>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {transactions.map((transaction, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className={`p-2 rounded-md bg-${getTransactionColor(transaction.transaction_type)}-100 dark:bg-${getTransactionColor(transaction.transaction_type)}-900/20 mr-2`}>
                                    <FontAwesomeIcon
                                        icon={getTransactionIcon(transaction.transaction_type)}
                                        className={`h-4 w-4 text-${getTransactionColor(transaction.transaction_type)}-600 dark:text-${getTransactionColor(transaction.transaction_type)}-400`}
                                    />
                                </span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {transaction.transaction_type.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                            <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${transaction.status === 'completed'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : transaction.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                {transaction.status.toUpperCase()}
                            </span>
                        </div>
                        <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-700 dark:text-gray-300">Description: {transaction.description}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Amount: {transaction.amount}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Date: {transaction.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/25">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className={`p-2 rounded-md bg-${getTransactionColor(transaction.transaction_type)}-100 dark:bg-${getTransactionColor(transaction.transaction_type)}-900/20 mr-2`}>
                                                <FontAwesomeIcon
                                                    icon={getTransactionIcon(transaction.transaction_type)}
                                                    className={`h-4 w-4 text-${getTransactionColor(transaction.transaction_type)}-600 dark:text-${getTransactionColor(transaction.transaction_type)}-400`}
                                                />
                                            </span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {transaction.transaction_type.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-white">{transaction.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.amount}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'completed'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                : transaction.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                            }`}>
                                            {transaction.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {transaction.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
