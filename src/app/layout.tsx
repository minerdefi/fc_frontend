'use client';

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Loader from '../components/common/Loader';
import { Suspense } from 'react';
import Web3ModalProvider from '@/context/Web3ModalProvider';
import WalletDebug from '@/components/common/WalletDebug';
import WalletConnectionCheck from '@/components/common/WalletConnectionCheck';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const isDevMode = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className="relative">
        <Web3ModalProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="forbes-capital-theme"
            >
              {!isDashboardPage && <Navbar />}
              <main className={`flex-grow ${!isDashboardPage ? 'pt-16' : ''}`}>
                <Suspense fallback={<Loader fullScreen text="Loading..." />}>
                  {children}
                </Suspense>
              </main>
              {!isDashboardPage && <Footer />}
              <WalletConnectionCheck />
              {isDevMode && <WalletDebug />}
            </ThemeProvider>
          </AuthProvider>
        </Web3ModalProvider>

        {/* Add init script for better wallet detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Fix for some wallet providers that need a nudge to initialize
                window.addEventListener('load', () => {
                  if (window.ethereum) {
                    console.log("Ethereum provider detected");
                    window.ethereum.request({ method: 'eth_chainId' })
                      .catch(err => console.log("Provider warm-up complete"));
                  }
                });

                // Detect Brave Wallet specifically
                if (navigator.brave && window.ethereum) {
                  console.log("Brave browser detected, checking wallet compatibility");
                }
              } catch (e) {}
            `
          }}
        />
      </body>
    </html>
  );
}
