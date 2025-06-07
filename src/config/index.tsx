import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';

// Define the project ID from WalletConnect Cloud
export const projectId = 'dd830d985907b8065908432e4742bd54';

if (!projectId) {
    console.warn('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID environment variable');
}

// Define the chains you want to support
const chains = [mainnet, arbitrum] as const;

// Create wagmi config only if projectId exists
export const wagmiConfig = projectId
    ? defaultWagmiConfig({
        chains,
        projectId,
        metadata: {
            name: 'FG Premium',
            description: 'Connecting web3 to traditional finance',
            url: 'https://fgpremiumfunds.com',
            icons: ['https://fgpremiumfunds.com/favicon.ico']
        }
    })
    : null;

// Initialize modal only if wagmiConfig exists
if (wagmiConfig && projectId) {
    try {
        createWeb3Modal({
            wagmiConfig,
            projectId
        });
    } catch (e) {
        console.error('Failed to initialize Web3Modal:', e);
    }
}

export default wagmiConfig;
