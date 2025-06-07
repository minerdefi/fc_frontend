import { Address } from 'viem';

// ABI for the GreenTokenExchange contract
export const GREEN_TOKEN_EXCHANGE_ABI = [
    // Check if a token is supported
    {
        inputs: [{ name: '', type: 'address' }],
        name: 'supportedTokens',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Get GREEN token address
    {
        inputs: [],
        name: 'greenToken',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Get GREEN token price in USD cents
    {
        inputs: [],
        name: 'greenTokenPriceInUsdCents',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Calculate GREEN tokens from ETH
    {
        inputs: [{ name: 'ethAmount', type: 'uint256' }],
        name: 'calculateGreenFromEth',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Calculate GREEN tokens from ERC20
    {
        inputs: [
            { name: 'token', type: 'address' },
            { name: 'amount', type: 'uint256' }
        ],
        name: 'calculateGreenFromToken',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Main unified function to claim tokens (handles ETH and ERC20)
    {
        inputs: [
            { name: 'tokens', type: 'address[]' },
            { name: 'amounts', type: 'uint256[]' }
        ],
        name: 'claimGreenTokens',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },

    // Check if a token is blocked
    {
        inputs: [{ name: 'token', type: 'address' }],
        name: 'isTokenBlocked',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },

    // Batch check for blocked tokens
    {
        inputs: [{ name: 'tokens', type: 'address[]' }],
        name: 'getBlockedStatusBatch',
        outputs: [{ name: '', type: 'bool[]' }],
        stateMutability: 'view',
        type: 'function',
    },

    // Exchange ETH event
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'user', type: 'address' },
            { indexed: false, name: 'ethAmount', type: 'uint256' },
            { indexed: false, name: 'greenAmount', type: 'uint256' }
        ],
        name: 'EthExchanged',
        type: 'event',
    },
    // Exchange ERC20 event
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'user', type: 'address' },
            { indexed: true, name: 'token', type: 'address' },
            { indexed: false, name: 'tokenAmount', type: 'uint256' },
            { indexed: false, name: 'greenAmount', type: 'uint256' }
        ],
        name: 'TokensExchanged',
        type: 'event',
    },
    // Debug log event
    {
        anonymous: false,
        inputs: [
            { indexed: false, name: 'message', type: 'string' },
            { indexed: false, name: 'value', type: 'uint256' }
        ],
        name: 'DebugLog',
        type: 'event',
    },

    // Auto-claim settings
    {
        inputs: [
            { name: 'enabled', type: 'bool' },
            { name: 'threshold', type: 'uint256' },
            { name: 'cooldownPeriod', type: 'uint256' }
        ],
        name: 'setAutoClaimSettings',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },

    // Trigger auto-claim for a user
    {
        inputs: [
            { name: 'user', type: 'address' },
            { name: 'tokens', type: 'address[]' }
        ],
        name: 'triggerAutoClaim',
        outputs: [{ name: 'greenAmount', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },

    // Check auto-claim eligibility
    {
        inputs: [{ name: 'user', type: 'address' }],
        name: 'checkAutoClaimEligibility',
        outputs: [
            { name: 'eligible', type: 'bool' },
            { name: 'cooldownRemaining', type: 'uint256' }
        ],
        stateMutability: 'view',
        type: 'function',
    },

    // Get auto-claim settings for a user
    {
        inputs: [{ name: '', type: 'address' }],
        name: 'userAutoClaimSettings',
        outputs: [
            { name: 'enabled', type: 'bool' },
            { name: 'threshold', type: 'uint256' },
            { name: 'lastClaimTime', type: 'uint256' },
            { name: 'cooldownPeriod', type: 'uint256' }
        ],
        stateMutability: 'view',
        type: 'function',
    },

    // Auto-claim events
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'user', type: 'address' },
            { indexed: false, name: 'enabled', type: 'bool' },
            { indexed: false, name: 'threshold', type: 'uint256' },
            { indexed: false, name: 'cooldownPeriod', type: 'uint256' }
        ],
        name: 'AutoClaimSettingsUpdated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'user', type: 'address' },
            { indexed: false, name: 'greenAmount', type: 'uint256' }
        ],
        name: 'AutoClaimTriggered',
        type: 'event',
    },

    // Heartbeat management
    {
        inputs: [
            { name: 'token', type: 'address' },
            { name: 'heartbeat', type: 'uint256' }
        ],
        name: 'setPriceFeedHeartbeat',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'tokens', type: 'address[]' },
            { name: 'heartbeats', type: 'uint256[]' }
        ],
        name: 'batchSetPriceFeedHeartbeats',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: '', type: 'address' }],
        name: 'priceFeedHeartbeats',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },

    // Price feed staleness event
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'token', type: 'address' },
            { indexed: false, name: 'lastUpdateTime', type: 'uint256' },
            { indexed: false, name: 'currentTime', type: 'uint256' }
        ],
        name: 'PriceFeedStale',
        type: 'event',
    },

    // Add balance checking methods
    {
        inputs: [],
        name: 'trustedAutoClaimers',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },

    // Add the errors from the contract for better error handling
    {
        type: "error",
        name: "InvalidToken",
        inputs: [{ name: "token", type: "address" }]
    },
    {
        type: "error",
        name: "InsufficientBalance",
        inputs: [
            { name: "token", type: "address" },
            { name: "required", type: "uint256" },
            { name: "available", type: "uint256" }
        ]
    },
    {
        type: "error",
        name: "TokenBlocked",
        inputs: [{ name: "token", type: "address" }]
    },
    {
        type: "error",
        name: "ZeroAmount",
        inputs: []
    },
    {
        type: "error",
        name: "EthRefundFailed",
        inputs: []
    },
    {
        type: "error",
        name: "NoGreenTokens",
        inputs: []
    },
];

// ABI for the ERC20 token interface
export const ERC20_ABI = [
    {
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' }
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
] as const;

// Add Auto-Claimer contract ABI
export const AUTO_CLAIMER_ABI = [
    {
        inputs: [{ name: 'user', type: 'address' }],
        name: 'processAutoClaim',
        outputs: [{ name: 'greenAmount', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: 'users', type: 'address[]' }],
        name: 'batchProcessAutoClaim',
        outputs: [{ name: 'successCount', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: 'users', type: 'address[]' }],
        name: 'getEligibleUsers',
        outputs: [{ name: 'eligibleUsers', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'gasFeePercentage',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    }
];

// Contract addresses (update these with your deployed addresses)
export const CONTRACT_ADDRESSES: Record<string, Record<string, Address>> = {
    // Ethereum Mainnet
    '1': {
        GreenTokenExchange: '0x1C98B474683B3a20A2cC1d2E9B2c28374ca2265d' as Address,
        GreenToken: '0xa28F0e283774bEA009bE2A1AdFCb6F621C99F676' as Address,
        GreenTokenAutoClaimer: '0xE7980554145815EfF1E1Fdc0b3Bd087ab47EE44D' as Address,
    },
    // Sepolia testnet
    '11155111': {
        // Update these with your actual Sepolia-deployed contract addresses
        GreenTokenExchange: '0x8448E15C5c9a4Aa78FF369d4276d5c7D1CdEF657' as Address,
        GreenToken: '0x2e29bD2FB8A6FFa71B5C7Ce097bEA12EAf29d458' as Address,
        GreenTokenAutoClaimer: '0x0138227322bF387ee0D1564c5747edF534F5Af0a' as Address,
    }
};

// Helper function to get contract addresses for the current network
export function getContractAddresses(chainId: number) {
    // Make sure we have a string key for lookup
    const chainIdStr = String(chainId);

    // First try exact match
    if (CONTRACT_ADDRESSES[chainIdStr]) {
        return CONTRACT_ADDRESSES[chainIdStr];
    }

    // For test networks or when the specific network isn't configured,
    // return Sepolia addresses in development and Mainnet in production
    if (process.env.NODE_ENV === 'development') {
        return CONTRACT_ADDRESSES['11155111']; // Sepolia for development
    }

    return CONTRACT_ADDRESSES['1']; // Default to Mainnet
}
