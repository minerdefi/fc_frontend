'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const pathname = usePathname();

    // Don't render navbar on auth pages and dashboard
    const hiddenRoutes = ['/login', '/register', '/verify-email', '/dashboard'];
    const shouldHideNavbar = hiddenRoutes.some(route => pathname?.startsWith(route));

    if (shouldHideNavbar) {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/images/fc1.png"
                                alt="FG Premium Logo"
                                width={40}
                                height={40}
                                className="dark:invert"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-[#308e87] px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
