'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssetDistributionChartProps {
    availableBalance: number;
    adaBalance: number;
    taxBalance: number;
    earnings: number;
}

export default function AssetDistributionChart({
    availableBalance,
    adaBalance,
    taxBalance,
    earnings
}: AssetDistributionChartProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const data = {
        labels: ['Available Balance', 'ADA Balance', 'Tax Balance', 'Earnings'],
        datasets: [
            {
                data: [availableBalance, adaBalance, taxBalance, earnings],
                backgroundColor: [
                    '#10B981', // emerald-500
                    '#818CF8', // indigo-400
                    '#F472B6', // pink-400
                    '#3B82F6', // blue-500
                ],
                borderColor: isDark ? '#1F2937' : '#FFFFFF',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: isDark ? '#E5E7EB' : '#374151',
                    padding: 20,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        })}`;
                    }
                }
            }
        },
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Pie data={data} options={options} />
        </div>
    );
}
