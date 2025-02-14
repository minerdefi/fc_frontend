'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, checkAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth, router]); // Add missing dependencies

    if (!isAuthenticated) {
        return null;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
