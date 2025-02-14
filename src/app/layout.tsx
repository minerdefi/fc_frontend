'use client';

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";  // Make sure this points to your original Footer component
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Loader from '@/components/common/Loader';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-white dark:bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="forbes-capital-theme"
        >
          <AuthProvider>
            {!isDashboardPage && <Navbar />}
            <main className={`flex-grow ${!isDashboardPage ? 'pt-16' : ''}`}>
              <Suspense fallback={<Loader fullScreen text="Loading..." />}>
                {children}
              </Suspense>
            </main>
            {!isDashboardPage && <Footer />}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
