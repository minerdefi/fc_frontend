import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to validate if we're on a supported network 
 * and to help users switch to the right network
 */
export async function GET(request: Request) {
    const SUPPORTED_NETWORKS = [
        {
            id: 1,
            name: 'Ethereum Mainnet',
            rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
            isMain: true,
            currency: 'ETH',
        },
        {
            id: 11155111,
            name: 'Sepolia Testnet',
            rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/your-api-key',
            isTest: true,
            currency: 'ETH',
        }
    ];

    // Default to mainnet in production or sepolia in dev
    const defaultNetwork = process.env.NODE_ENV === 'production'
        ? SUPPORTED_NETWORKS[0]
        : SUPPORTED_NETWORKS[1];

    return NextResponse.json({
        networks: SUPPORTED_NETWORKS,
        defaultNetwork,
    });
}
