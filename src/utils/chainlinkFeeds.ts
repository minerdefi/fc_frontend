import { Address } from 'viem';

// Chainlink price feed addresses by network
// See https://docs.chain.link/data-feeds/price-feeds/addresses for official addresses

export interface ChainlinkFeed {
    feedAddress: Address;
    heartbeat: number; // in seconds
    decimals: number;
}

// Using lookup by network ID and token address
export type NetworkFeeds = Record<string, Record<string, ChainlinkFeed>>;

export const CHAINLINK_FEEDS: NetworkFeeds = {
    // Ethereum Mainnet
    '1': {
        // ETH USD
        'ETH': {
            feedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419' as Address,
            heartbeat: 3600, // 1 hour
            decimals: 8
        },
        // USDC USD
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
            feedAddress: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6' as Address,
            heartbeat: 86400, // 24 hours
            decimals: 8
        },
        // USDT USD
        '0xdAC17F958D2ee523a2206206994597C13D831ec7': {
            feedAddress: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D' as Address,
            heartbeat: 86400, // 24 hours
            decimals: 8
        },
        // DAI USD
        '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
            feedAddress: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9' as Address,
            heartbeat: 86400, // 24 hours
            decimals: 8
        },
        // LINK USD
        '0x514910771AF9Ca656af840dff83E8264EcF986CA': {
            feedAddress: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c' as Address,
            heartbeat: 3600, // 1 hour
            decimals: 8
        },
        // WBTC USD
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': {
            feedAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c' as Address,
            heartbeat: 3600, // 1 hour
            decimals: 8
        },
        // AAVE USD
        '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': {
            feedAddress: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9' as Address,
            heartbeat: 86400, // 24 hours
            decimals: 8
        },
        // UNI USD
        '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': {
            feedAddress: '0x553303d460EE0afB37EdFf9bE42922D8FF63220e' as Address,
            heartbeat: 86400, // 24 hours
            decimals: 8
        },
        // SNX USD
        '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F': {
            feedAddress: '0xDC3EA94CD0AC27d9A86C180091e7f78C683d3699' as Address,
            heartbeat: 86400, // 24 hours
            decimals: 8
        },
        // For convenience, include a direct BTC feed pointer too
        'BTC': {
            feedAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c' as Address,
            heartbeat: 3600,
            decimals: 8
        },
    },

    // Sepolia
    '11155111': {
        // ETH USD
        'ETH': {
            feedAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306' as Address,
            heartbeat: 3600, // 1 hour
            decimals: 8
        },
        // WBTC USD on Sepolia (using BTC/USD feed)
        '0x9C4667fD20934110D184DF13a956Fb934D537d3c': {
            feedAddress: '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43' as Address,
            heartbeat: 3600, // 1 hour
            decimals: 8
        },
        // For convenience
        'BTC': {
            feedAddress: '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43' as Address,
            heartbeat: 3600,
            decimals: 8
        }
        // Add other Sepolia feeds as needed
    },

    // Polygon
    '137': {
        // MATIC USD
        'MATIC': {
            feedAddress: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0' as Address,
            heartbeat: 1800, // 30 minutes
            decimals: 8
        },
        // ETH USD on Polygon
        'ETH': {
            feedAddress: '0xF9680D99D6C9589e2a93a78A04A279e509205945' as Address,
            heartbeat: 3600, // 1 hour
            decimals: 8
        }
        // Add other Polygon feeds as needed
    }
};

/**
 * Get Chainlink feed details for a specific token on a network
 */
export function getChainlinkFeed(chainId: string, tokenAddress: string): ChainlinkFeed | undefined {
    // Handle ETH special case
    if (tokenAddress === '0x0000000000000000000000000000000000000000' ||
        tokenAddress === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        tokenAddress = 'ETH';
    }

    // Get network feeds
    const networkFeeds = CHAINLINK_FEEDS[chainId];
    if (!networkFeeds) return undefined;

    // Try exact match
    let feed = networkFeeds[tokenAddress];
    if (feed) return feed;

    // Try lowercase match
    const lowercaseAddress = tokenAddress.toLowerCase();
    const matchedEntry = Object.entries(networkFeeds).find(
        ([addr, _]) => addr.toLowerCase() === lowercaseAddress
    );

    return matchedEntry?.[1];
}
