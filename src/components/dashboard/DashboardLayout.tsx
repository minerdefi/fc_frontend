'use client';

import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { User } from '@/types/auth';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { profile } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Single Navbar with user info */}
            <DashboardNavbar
                onMenuClick={() => setSidebarOpen(true)}
                username={profile?.username}
                email={profile?.email}
            />

            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="lg:pl-64">
                <div className="p-6 mt-16">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
