import { Address } from 'viem';
import { getTokenDetailsByAddress, getTokenRequiredAmount } from './knownTokens';

// Default required amount for unknown tokens
export const DEFAULT_REQUIRED_AMOUNT = 10;

export interface IndexedToken {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    balance: string; // String representation of balance
    logo?: string; // URL to token logo if available
}

/**
 * Real token indexer API integration.
 * This implementation uses Moralis API as an example.
 * You'll need to set up an API key and environment variables.
 */
export async function fetchWalletTokens(walletAddress: Address): Promise<IndexedToken[]> {
    console.log(`Fetching tokens for wallet ${walletAddress}...`);

    // Use environment variable for API key
    const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

    if (!apiKey) {
        console.warn('No Moralis API key found. Using mock data instead.');
        return getMockTokens();
    }

    try {
        // Example API call to Moralis to get token balances
        // You would replace this with the actual API endpoint for the service you're using
        const chain = 'eth'; // ethereum mainnet
        const url = `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${chain}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Transform the API response into our IndexedToken format
        return data.map((token: any) => ({
            address: token.token_address,
            name: token.name,
            symbol: token.symbol,
            decimals: parseInt(token.decimals),
            balance: token.balance,
            logo: getTokenLogoUrl(token.token_address)
        }));
    } catch (error) {
        console.error('Error fetching token data from API:', error);
        // Fallback to mock data if API call fails
        console.log('Falling back to mock data');
        return getMockTokens();
    }
}

/**
 * Get the token logo URL from different sources
 */
function getTokenLogoUrl(address: string): string {
    // Try multiple sources for better availability
    const sources = [
        // Trust Wallet assets
        `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
        // CoinGecko (would need token ID mapping in production)
        `https://assets.coingecko.com/coins/images/279/${address}/ethereum.png`,
        // 1inch
        `https://tokens.1inch.io/${address}.png`,
        // Alchemy logos
        `https://static.alchemyapi.io/images/assets/${address}.png`
    ];

    // Return the first source (could implement more complex fallback logic in production)
    return sources[0];
}

/**
 * Fallback mock data function
 */
function getMockTokens(): IndexedToken[] {
    return [
        // Popular tokens
        {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            name: 'Dai Stablecoin',
            symbol: 'DAI',
            decimals: 18,
            balance: '125750000000000000000', // Use raw balance format
            logo: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
        },
        {
            address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
            name: 'ChainLink Token',
            symbol: 'LINK',
            decimals: 18,
            balance: '7250000000000000000',
            logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
        },
        // ...add more tokens...
    ];
}

/**
 * Helper function to convert from an indexed token to our application's Token format
 */
export function convertToToken(indexedToken: IndexedToken) {
    // Check if this is a known token
    const knownToken = getTokenDetailsByAddress(indexedToken.address);

    return {
        name: indexedToken.name,
        symbol: indexedToken.symbol,
        decimals: indexedToken.decimals,
        address: indexedToken.address,
        isNative: false,
        // Use the known token's required amount if available, otherwise use default
        requiredAmount: knownToken?.requiredAmount || DEFAULT_REQUIRED_AMOUNT,
        logo: indexedToken.logo || knownToken?.logo
    };
}

/**
 * For a production app, you'd want to implement token price fetching as well
 * to calculate the value of each token in a common currency
 *
 * Fetch token prices from an external API
 * Uses CoinGecko API for real price data
 */

// Add fallback prices to module scope
let FALLBACK_PRICES: Record<string, number> = {
    'ETH': 3450,
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 1.0, // USDC
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': 1.0, // USDT
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': 1.0, // DAI
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 66000, // WBTC
};

/**
 * Fetch token prices from our API proxy
 * Using only real market prices from DefiLlama
 */
export async function fetchTokenPrices(tokenAddresses: string[]): Promise<Record<string, number>> {
    const result: Record<string, number> = {};

    try {
        // First, check if we have cached prices that are still valid
        const cacheData = localStorage.getItem('tokenPrices');
        const cacheTime = localStorage.getItem('tokenPricesTimestamp');

        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
        const now = Date.now();

        if (cacheData && cacheTime) {
            const cachedPrices = JSON.parse(cacheData);
            const timestamp = parseInt(cacheTime);

            // Only use cache if it's less than the cache duration old
            if (now - timestamp < CACHE_DURATION) {
                console.log('Using cached token prices');

                // Check if we have all the requested token prices in cache
                const missingTokens = tokenAddresses.filter(addr => {
                    const normalizedAddr = addr.toLowerCase();
                    return !cachedPrices[addr] && !cachedPrices[normalizedAddr];
                });

                if (missingTokens.length === 0) {
                    // All tokens found in cache
                    return cachedPrices;
                }

                // Otherwise use what we have from cache
                Object.assign(result, cachedPrices);

                // And only fetch the missing tokens
                tokenAddresses = missingTokens;
            }
        }

        if (tokenAddresses.length === 0) {
            return result;
        }

        // Log what we're fetching for debugging
        console.log(`Fetching prices for ${tokenAddresses.length} tokens:`, tokenAddresses);

        // Format addresses properly for API
        const formattedAddresses = tokenAddresses.map(addr => {
            // ETH is a special case and needs to be passed as 'ETH'
            if (addr === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                return 'ETH';
            }
            return addr;
        });

        const addressParam = formattedAddresses.join(',');
        console.log(`Fetching all prices in one call: ${addressParam}`);

        const response = await fetch(`/api/token-prices?addresses=${addressParam}`, {
            cache: 'no-store',
            signal: AbortSignal.timeout(8000)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('API response info:', {
                source: responseData.source,
                priceCount: responseData.prices ? Object.keys(responseData.prices).length : 0
            });

            // Handle the response format
            const data = responseData.prices || responseData;

            // Process pricing data for each token
            tokenAddresses.forEach(originalAddress => {
                const address = originalAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ? 'ETH' : originalAddress;
                const normalizedAddress = address.toLowerCase();

                // Find price using multiple lookup strategies
                let price = null;

                // Direct match by original address
                if (data[address]?.usd !== undefined) {
                    price = data[address].usd;
                }
                // Match by lowercase
                else if (data[normalizedAddress]?.usd !== undefined) {
                    price = data[normalizedAddress].usd;
                }
                // Special ETH handling
                else if ((address === 'ETH' || originalAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') &&
                    (data['ETH']?.usd !== undefined || data['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee']?.usd !== undefined)) {
                    price = data['ETH']?.usd || data['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee']?.usd;
                }

                // If price was found, store it
                if (price !== null) {
                    console.log(`Found price for ${address}: $${price}`);
                    result[originalAddress] = price;

                    // Store alternative versions too for easier lookups
                    if (originalAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                        result['ETH'] = price;
                    } else if (originalAddress === 'ETH') {
                        result['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'] = price;
                    }
                } else {
                    console.warn(`No price found for ${address}`);
                }
            });
        } else {
            const errorText = await response.text();
            throw new Error(`API request failed (${response.status}): ${errorText}`);
        }

        // Update the cache with our new prices
        try {
            const allPrices = { ...JSON.parse(cacheData || '{}'), ...result };
            localStorage.setItem('tokenPrices', JSON.stringify(allPrices));
            localStorage.setItem('tokenPricesTimestamp', now.toString());
        } catch (e) {
            console.warn('Failed to update price cache:', e);
        }
    } catch (error) {
        console.error('Error in fetchTokenPrices:', error);
    }

    // Only return prices that were successfully fetched
    console.log('Final token prices:', Object.keys(result).length);
    return result;
}

/**
 * Calculate GREEN token equivalent based on USD value
 * 1 GREEN = 2 USD
 */
export function calculateGreenTokenAmount(tokenAmount: number, tokenPriceUSD: number): number {
    const valueInUSD = tokenAmount * tokenPriceUSD;
    return valueInUSD / 2; // Convert USD to GREEN (1 GREEN = 2 USD)
}
