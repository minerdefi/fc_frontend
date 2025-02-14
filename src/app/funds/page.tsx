"use client";

import { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import HeroSection from "./components/HeroSection";
import MarketStats from "./components/MarketStats";
import PerformanceChart from "./components/PerformanceChart";
import Returns from "./components/Returns";
import FundHoldings from "./components/FundHoldings";
import KeyFacts from "./components/KeyFacts";
import FeesAndExpenses from "./components/FeesAndExpenses";
import FundDetails from "./components/FundDetails";
import InvestSection from "./components/InvestSection";
import MethodologySection from "./components/MethodologySection"; // Fixed import path

export default function FundsPage() {
    return (
        <PageLayout>
            <HeroSection />
            <MarketStats />
            <PerformanceChart />
            <Returns />
            <FundHoldings />
            <KeyFacts />
            <FeesAndExpenses />
            <FundDetails />
            <InvestSection />
            <MethodologySection />
        </PageLayout>
    );
}
