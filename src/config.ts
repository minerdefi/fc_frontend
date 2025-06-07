import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

// Get environment variables
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''
const moralisApiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || ''

// Fix Moralis RPC URL format
const MORALIS_RPC_URLS = {
  // Ethereum Mainnet
  [mainnet.id]: moralisApiKey ?
    `https://deep-index.moralis.io/api/v2/speedy-nodes/eth/mainnet/${moralisApiKey}` :
    'https://ethereum.publicnode.com',
  // Sepolia Testnet
  [sepolia.id]: moralisApiKey ?
    `https://deep-index.moralis.io/api/v2/speedy-nodes/eth/sepolia/${moralisApiKey}` :
    'https://ethereum-sepolia.publicnode.com',
};

// Define the metadata for your dApp
const metadata = {
  name: 'FG Premium',
  description: 'FG Premium',
  url: 'https://fgpremiumfunds.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// Setup wagmi config
const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(MORALIS_RPC_URLS[mainnet.id]),
    [sepolia.id]: http(MORALIS_RPC_URLS[sepolia.id]),
  },
  connectors: [
    walletConnect({
      projectId: walletConnectProjectId,
      metadata,
      showQrModal: true,
    }),
    injected(),
    coinbaseWallet({
      appName: 'FG Premium',
    }),
  ],
  ssr: true, // Enable server-side rendering support
})

export default config
