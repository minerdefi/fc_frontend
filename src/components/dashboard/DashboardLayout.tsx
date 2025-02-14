'use client';

import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { User } from '@/types/auth';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content - Adjusted spacing */}
            <div className="lg:pl-64">
                <div className="p-6 mt-16"> {/* Added mt-16 for navbar height */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
