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

const initialHoldings = [
    { name: "Bitcoin", logo: "BTC.svg", weight: "70.8%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Ethereum", logo: "ETH.svg", weight: "15.2%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Solana", logo: "SOL.svg", weight: "3.2%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "XRP", logo: "XRP.svg", weight: "2.4%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Cardano", logo: "ADA.svg", weight: "2.1%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Avalanche", logo: "AVAX.svg", weight: "1.8%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Chainlink", logo: "LINK.svg", weight: "1.6%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Sui", logo: "SUI.svg", weight: "1.2%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Polkadot", logo: "DOT.svg", weight: "1.0%", marketCap: "$0", price: "$0", change: "0%", isPositive: true },
    { name: "Litecoin", logo: "LTC.svg", weight: "0.7%", marketCap: "$0", price: "$0", change: "0%", isPositive: true }
];

export default function FundsPage() {
    return (
        <PageLayout>
            <HeroSection />
            <MarketStats />
            <PerformanceChart />
            <Returns />
            <FundHoldings initialHoldings={initialHoldings} />
            <KeyFacts />
            <FeesAndExpenses />
            <FundDetails />
            <InvestSection />
            <MethodologySection />
        </PageLayout>
    );
}
