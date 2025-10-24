'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function DashboardPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();

    // Check authentication and redirect if not authenticated
    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            console.log('User not authenticated, redirecting to login');
            router.push('/login');
            return;
        }
    }, [isAuthenticated, isAuthLoading, router]);

    // Show loading while authentication is being checked
    if (isAuthLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#308e87]"></div>
            </div>
        );
    }

    // If not authenticated, don't render anything (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
