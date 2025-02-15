'use client';

import { ThemeProvider } from 'next-themes';
import '../globals.css';

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body suppressHydrationWarning={true}>
                <ThemeProvider attribute="class" defaultTheme="system">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
