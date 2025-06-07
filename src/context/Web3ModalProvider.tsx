'use client';

import React, { useEffect, useState } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import WalletConfigFallback from '@/components/common/WalletConfigFallback';

interface Props {
  children: React.ReactNode;
}

// Create a client for React Query with better caching options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 5 * 1000,
    },
  },
});

// Get environment variables
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// More reliable RPC endpoints
const RPC_URLS = {
  [mainnet.id]: 'https://eth.llamarpc.com',
  [sepolia.id]: 'https://rpc.sepolia.org',
};

// Define the metadata for your dApp
const metadata = {
  name: 'Forbes Capital',
  description: 'Forbes Capital - Sustainable Finance Platform',
  url: 'https://forbescapital.finance',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Check if required environment variables are set
const hasRequiredConfig = !!walletConnectProjectId;

// Setup wagmi config with improved options for transaction handling
const config = createConfig({
  chains: [mainnet, sepolia], transports: {
    [mainnet.id]: http(RPC_URLS[mainnet.id], {
      batch: true,
      fetchOptions: { cache: 'no-store' },
      retryCount: 3,
      retryDelay: 1000,
      timeout: 30000, // Increased timeout for slow RPC responses
    }),
    [sepolia.id]: http(RPC_URLS[sepolia.id], {
      batch: true,
      fetchOptions: { cache: 'no-store' },
      retryCount: 3,
      retryDelay: 1000,
      timeout: 30000, // Increased timeout for slow RPC responses
    }),
  },
  connectors: hasRequiredConfig
    ? [
      walletConnect({
        projectId: walletConnectProjectId,
        metadata,
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'light',
          themeVariables: {
            '--wcm-z-index': '9999',
            '--wcm-accent-color': '#308e87',
            '--wcm-background-color': '#308e87',
          },
        },
      }),
      injected({
        shimDisconnect: true,
      }),
      coinbaseWallet({
        appName: 'Forbes Capital',
      }),
    ]
    : [injected({ shimDisconnect: true })],
  ssr: true,
  syncConnectedChain: true,
});

// Create the web3modal instance
if (typeof window !== 'undefined' && walletConnectProjectId) {
  try {
    // Add global transaction handler for debugging
    window.addEventListener('unhandledrejection', function (event) {
      if (event.reason &&
        (event.reason.message &&
          (event.reason.message.includes('user rejected') ||
            event.reason.message.includes('transaction') ||
            event.reason.message.includes('contract')))) {
        console.warn('Caught transaction rejection:', event.reason);
      }
    }); createWeb3Modal({
      wagmiConfig: config,
      projectId: walletConnectProjectId,
      themeMode: 'light',
      enableAnalytics: true,
      enableOnramp: false,
    });
    console.log('Web3Modal initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Web3Modal:', error);
  }
}

export default function Web3ModalProvider({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add global ethereum provider error handler
    if (window.ethereum) {
      const handleProviderError = (error: any) => {
        console.error("Ethereum provider error:", error);
      };

      window.ethereum.on('error', handleProviderError);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('error', handleProviderError);
        }
      };
    }
  }, []);

  return (
    <>
      {mounted ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
      {!hasRequiredConfig && <WalletConfigFallback />}
    </>
  );
}