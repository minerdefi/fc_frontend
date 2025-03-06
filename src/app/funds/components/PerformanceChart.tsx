"use client";

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function PerformanceChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const initialData = generateChartData('5y');
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: initialData.labels,
                        datasets: [
                            {
                                label: 'NAV Per Share',
                                data: initialData.nav,
                                borderColor: '#308e87',
                                backgroundColor: 'rgba(48, 142, 135, 0.1)',
                                tension: 0.4,
                                fill: true
                            },
                            {
                                label: 'Traded Price',
                                data: initialData.traded,
                                borderColor: '#4CAF50',
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                tension: 0.4,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: true, position: 'top' },
                            tooltip: { mode: 'index', intersect: false }
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                title: { display: true, text: 'Time' }
                            },
                            y: {
                                beginAtZero: false,
                                suggestedMax: 150,
                                title: { display: true, text: 'Price ($)' },
                                grid: { color: '#E5E7EB' }
                            }
                        }
                    }
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">PERFORMANCE</h2>
                <div className="flex items-center space-x-4 mb-6 overflow-x-auto">
                    {['7d', '1m', '3m', '1y', '5y', 'ytd', 'all'].map((period) => (
                        <button
                            key={period}
                            onClick={() => updateChart(period.toLowerCase())}
                            className="time-btn text-gray-500 shadow-md p-2 bg-gray-300 dark:bg-stone-800 hover:text-gray-700 font-medium rounded"
                        >
                            {period.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="relative w-full h-[400px]">
                    <canvas ref={chartRef}></canvas>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Past performance does not predict future results. The blue line shows the performance
                    of the Fund on a NAV per share basis, net of fees and expenses. The green line shows
                    the last daily traded price for the shares.
                </p>
            </div>
        </section>
    );
}

function generateChartData(range: string) {
    const data: { [key: string]: any } = {
        '7d': {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            nav: [123, 75, 106, 137, 87, 90, 124],
            traded: [100, 90, 80, 120, 102, 73, 150]
        },
        // ...add other time ranges as needed
    };
    return data[range] || data['7d'];
}

function updateChart(range: string) {
    // Implementation for updating chart data
}
