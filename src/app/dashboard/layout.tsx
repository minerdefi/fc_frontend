'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, checkAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!checkAuth()) {
            router.push('/login');
        }
    }, []);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
