export default function FundDetails() {
    const details = [
        { label: "Ticker", value: "FGTX" },
        { label: "Benchmark Index", value: "FG 10 Large Cap Blockchain Index" },
        { label: "Index Rebalancing", value: "Monthly" },
        { label: "ISIN", value: "******491013" },
        { label: "Market", value: "OTCQX,OTC" },
        { label: "Fund Type", value: "Blockchain Index Fund, Active Traded Fund" },
        { label: "Inception Date", value: "November 22, 2017" },
        { label: "AUM", value: "$1.98B" },
        { label: "Shares Outstanding", value: "9,241,947" }
    ];

    return (
        <section id="details" className="p-10 w-full mx-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto">
                <h3 className="text-2xl md:text-4xl mb-6">Fund Details</h3>
                <div className="grid gap-2 md:grid-cols-2">
                    {details.map((detail) => (
                        <div key={detail.label} className="space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <span className="text-xl font-semibold">{detail.label}</span>
                                <span className="text-sm text-right sm:text-left">{detail.value}</span>
                            </div>
                            <hr className="border-gray-600" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
