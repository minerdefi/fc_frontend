'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface PortfolioPerformanceChartProps {
    performanceData: {
        date: string;
        value: number;
    }[];
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        borderWidth?: number;
        fill?: boolean;
        tension?: number;
        pointRadius?: number;
        pointHitRadius?: number;
    }[];
}

export default function PortfolioPerformanceChart({ performanceData }: PortfolioPerformanceChartProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const data: ChartData = {
        labels: performanceData.map(item => item.date),
        datasets: [
            {
                label: 'Portfolio Value',
                data: performanceData.map(item => item.value),
                borderColor: '#10B981', // emerald-500
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHitRadius: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: isDark ? '#9CA3AF' : '#4B5563',
                    maxRotation: 0,
                },
            },
            y: {
                grid: {
                    color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: isDark ? '#9CA3AF' : '#4B5563',
                    callback: function (value: any) {
                        return '$' + value.toLocaleString();
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    return (
        <div className="w-full h-full">
            <Line data={data} options={options} />
        </div>
    );
}
