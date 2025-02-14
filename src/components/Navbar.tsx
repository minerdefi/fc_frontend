'use client';

import { usePathname } from 'next/navigation';
import { isAuthPage } from '@/utils/authPages';

const Navbar = () => {
    const pathname = usePathname();

    // Don't render navbar on auth pages
    if (isAuthPage(pathname)) {
        return null;
    }

    // ...rest of existing Navbar code...
};

export default Navbar;
