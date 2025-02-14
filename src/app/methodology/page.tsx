"use client";
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Sidebar from './components/Sidebar';
import MethodologyContent from './components/MethodologyContent';

export default function MethodologyPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <PageLayout>
            <section className="container titillium-web-light">
                <div className="flex min-h-screen">
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <MethodologyContent toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                </div>
            </section>
        </PageLayout>
    );
}
