import { NextResponse } from 'next/server';

/**
 * API route to fetch token prices from DefiLlama API
 * No fallbacks - using only real market prices
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const addresses = searchParams.get('addresses') || '';

        if (!addresses) {
            return NextResponse.json({ error: 'No addresses provided' }, { status: 400 });
        }

        const addressArray = addresses.split(',');
        console.log(`Processing prices for ${addressArray.length} tokens`);

        // Initialize the result object
        const result: Record<string, { usd: number }> = {};

        // Get prices from DefiLlama API
        const formattedAddresses = addressArray.map(addr => {
            // Special handling for ETH
            if (addr === 'ETH' || addr === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                return 'coingecko:ethereum';
            }
            // Standard ERC20 tokens
            return `ethereum:${addr}`;
        });

        console.log('Fetching prices from DefiLlama for:', formattedAddresses);

        // Call DefiLlama API
        const defiLlamaUrl = `https://coins.llama.fi/prices/current/${formattedAddresses.join(',')}`;
        console.log('DefiLlama API URL:', defiLlamaUrl);

        const response = await fetch(defiLlamaUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'NextJS App'
            },
            cache: 'no-store',
            signal: AbortSignal.timeout(5000)
        });

        console.log('DefiLlama response status:', response.status);

        if (response.ok) {
            const data = await response.json();

            if (data.coins) {
                const receivedPrices = Object.keys(data.coins).length;
                console.log(`Successfully received ${receivedPrices} prices from DefiLlama`);

                // Process each price entry
                Object.entries(data.coins).forEach(([key, value]: [string, any]) => {
                    if (!value || typeof value.price !== 'number') return;

                    // Extract the actual address from DefiLlama's format
                    if (key === 'coingecko:ethereum') {
                        // Handle ETH special case
                        result['ETH'] = { usd: value.price };
                        result['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'] = { usd: value.price };
                        console.log(`Got ETH price: $${value.price}`);
                    } else {
                        // Handle ERC20 tokens (format: ethereum:0x1234...)
                        const parts = key.split(':');
                        if (parts.length === 2) {
                            const address = parts[1];
                            // Store price with both original and lowercase address
                            result[address] = { usd: value.price };
                            result[address.toLowerCase()] = { usd: value.price };
                            console.log(`Got price for ${address}: $${value.price}`);
                        }
                    }
                });
            } else {
                console.warn('Unexpected DefiLlama response structure:', data);
            }
        } else {
            const errorText = await response.text();
            throw new Error(`DefiLlama API error (${response.status}): ${errorText.substring(0, 200)}`);
        }

        // Return only API prices, no fallbacks
        return NextResponse.json({
            prices: result,
            source: 'defillama'
        });
    } catch (error) {
        console.error('Error in token-prices API route:', error);
        return NextResponse.json({
            error: 'Failed to fetch token prices',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
