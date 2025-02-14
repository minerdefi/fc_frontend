'use client';

import { useAuth } from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faChartPie,
    faWallet,
    faArrowTrendUp,
    faUser,
    faCog,
    faCircleQuestion,
    faSignOutAlt,
    faXmark,
    faHistory,
    faMoneyBillTransfer,
    faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const { logout } = useAuth();
    const pathname = usePathname();

    const navigation = [
        {
            group: "Overview",
            items: [
                { name: 'Dashboard', href: '/dashboard', icon: faHome },
                { name: 'Transactions', href: '/dashboard/transactions', icon: faHistory },
            ]
        },
        {
            group: "Actions",
            items: [
                { name: 'Deposit', href: '/dashboard/deposit', icon: faMoneyBillTransfer },
                { name: 'Withdraw', href: '/dashboard/withdraw', icon: faMoneyBillWave },

            ]
        },
        {
            group: "Account",
            items: [
                { name: 'Profile', href: '/dashboard/profile', icon: faUser },
                { name: 'Settings', href: '/dashboard/settings', icon: faCog },
                { name: 'Help Center', href: '#', icon: faCircleQuestion },
            ]
        }
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64
                transition-transform duration-300 ease-in-out
                lg:transform-none lg:translate-x-0 lg:z-30
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col bg-white dark:bg-gray-900">
                    {/* Logo Section */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                        <Link href="/dashboard" className="flex items-center">
                            <Image
                                src="/images/fc1.png"
                                alt="Forbes Capital"
                                width={35}
                                height={35}
                                className="dark:invert"
                            />
                            <span className="ml-3 text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Forbes Capital
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
                        {navigation.map((group) => (
                            <div key={group.group}>
                                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {group.group}
                                </p>
                                <div className="mt-2 space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`
                                                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors
                                                    ${isActive
                                                        ? 'bg-[#308e87] text-white'
                                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }
                                                `}
                                            >
                                                <FontAwesomeIcon
                                                    icon={item.icon}
                                                    className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                                                />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile close button */}
            {isOpen && (
                <button
                    onClick={onClose}
                    className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </>
    );
}
