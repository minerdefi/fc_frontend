"use client";
import { motion } from 'framer-motion';
import PageLayout from "../components/PageLayout";
import OurFirm from "./components/OurFirm";
import TeamSection from "./components/TeamSection";
import AdvisorsSection from "./components/AdvisorsSection";

export default function TeamPage() {
    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                <OurFirm />
                <TeamSection />
                <AdvisorsSection />
            </div>
        </PageLayout>
    );
}
