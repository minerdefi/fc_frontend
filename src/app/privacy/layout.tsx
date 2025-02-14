export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex min-h-screen flex-col bg-white dark:bg-black">
            {children}
        </main>
    );
}
