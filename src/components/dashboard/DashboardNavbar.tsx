'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

interface DashboardNavbarProps {
    onMenuClick: () => void;
    username?: string;  // Add this prop
    email?: string;     // Add this prop
}

const DashboardNavbar = ({ onMenuClick, username, email }: DashboardNavbarProps) => {
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav className="fixed top-0 right-0 left-0 z-30 lg:left-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <FontAwesomeIcon
                                icon={theme === 'dark' ? faSun : faMoon}
                                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                            />
                        </button>



                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#308e87] flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-white" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {username || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {email || 'loading...'}
                                    </p>
                                </div>
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                    <div className="py-1">
                                        <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                                        <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                                        <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                        {/* <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
