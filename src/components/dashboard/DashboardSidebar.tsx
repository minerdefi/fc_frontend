'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
    const { logout } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { label: 'Overview', href: '/dashboard' },
        { label: 'Account', href: '/dashboard/account' },
        { label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg">
            <div className="p-4">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
                </div>
                <nav className="mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 rounded-lg mb-1 ${pathname === item.href
                                    ? 'bg-[#308e87] text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mt-4"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default DashboardSidebar;
