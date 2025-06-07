import { Token } from '@/types/tokens';

/**
 * List of known tokens with their metadata
 * We no longer need requiredAmount since we're calculating based on USD price
 */
export const knownTokens: Record<string, Partial<Token>> = {
    // Ethereum native token
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        isNative: true,
        logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    },

    // Stablecoins
    USDT: {
        name: 'Tether',
        symbol: 'USDT',
        decimals: 6,
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    },
    USDC: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        logo: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
    DAI: {
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        logo: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
    },
    BUSD: {
        name: 'Binance USD',
        symbol: 'BUSD',
        decimals: 18,
        address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
        logo: 'https://assets.coingecko.com/coins/images/9576/small/BUSD.png',
    },
    FRAX: {
        name: 'Frax',
        symbol: 'FRAX',
        decimals: 18,
        address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        logo: 'https://assets.coingecko.com/coins/images/13422/small/frax_logo.png',
    },

    // DeFi tokens
    AAVE: {
        name: 'Aave',
        symbol: 'AAVE',
        decimals: 18,
        address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        logo: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png',
    },
    COMP: {
        name: 'Compound',
        symbol: 'COMP',
        decimals: 18,
        address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        logo: 'https://assets.coingecko.com/coins/images/10775/small/COMP.png',
    },
    MKR: {
        name: 'Maker',
        symbol: 'MKR',
        decimals: 18,
        address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        logo: 'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png',
    },
    UNI: {
        name: 'Uniswap',
        symbol: 'UNI',
        decimals: 18,
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
    },
    SUSHI: {
        name: 'SushiSwap',
        symbol: 'SUSHI',
        decimals: 18,
        address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
        logo: 'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png',
    },
    LIDO: {
        name: 'Lido DAO',
        symbol: 'LDO',
        decimals: 18,
        address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
        logo: 'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png',
    },
    CURVE: {
        name: 'Curve DAO Token',
        symbol: 'CRV',
        decimals: 18,
        address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
        logo: 'https://assets.coingecko.com/coins/images/12124/small/Curve.png',
    },

    // Bitcoin Wraps
    WBTC: {
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        decimals: 8,
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        logo: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
    },
    RENBTC: {
        name: 'renBTC',
        symbol: 'RENBTC',
        decimals: 8,
        address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
        logo: 'https://assets.coingecko.com/coins/images/11370/small/Bitcoin.jpg',
    },

    // L2 and Scaling Solutions
    MATIC: {
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
        address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
        logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    },
    ARBITRUM: {
        name: 'Arbitrum',
        symbol: 'ARB',
        decimals: 18,
        address: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1',
        logo: 'https://assets.coingecko.com/coins/images/16547/small/arbitrum.png',
    },
    OPTIMISM: {
        name: 'Optimism',
        symbol: 'OP',
        decimals: 18,
        address: '0x4200000000000000000000000000000000000042',
        logo: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png',
    },

    // Other popular tokens
    LINK: {
        name: 'Chainlink',
        symbol: 'LINK',
        decimals: 18,
        address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    },
    BAT: {
        name: 'Basic Attention Token',
        symbol: 'BAT',
        decimals: 18,
        address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
        logo: 'https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png',
    },
    SNX: {
        name: 'Synthetix',
        symbol: 'SNX',
        decimals: 18,
        address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
        logo: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png',
    },
    CRV: {
        name: 'Curve DAO Token',
        symbol: 'CRV',
        decimals: 18,
        address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
        logo: 'https://assets.coingecko.com/coins/images/12124/small/Curve.png',
    },
    GRT: {
        name: 'The Graph',
        symbol: 'GRT',
        decimals: 18,
        address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7',
        logo: 'https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png',
    },
    YFI: {
        name: 'yearn.finance',
        symbol: 'YFI',
        decimals: 18,
        address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
        logo: 'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png',
    },
    SHIBA: {
        name: 'Shiba Inu',
        symbol: 'SHIB',
        decimals: 18,
        address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
    },
    PEPE: {
        name: 'Pepe',
        symbol: 'PEPE',
        decimals: 18,
        address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
        logo: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg',
    }
};

/**
 * Get token details from our list by address
 */
export function getTokenDetailsByAddress(address?: string): Partial<Token> | undefined {
    if (!address) return undefined;

    const normalizedAddress = address.toLowerCase();

    // Special case for ETH
    if (normalizedAddress === 'eth' || normalizedAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        return knownTokens.ETH;
    }

    // Find the token by address
    for (const [_, tokenDetails] of Object.entries(knownTokens)) {
        if (tokenDetails.address?.toLowerCase() === normalizedAddress) {
            return tokenDetails;
        }
    }

    return undefined;
}

/**
 * Get a token's proper required amount (how much is needed to claim 1 GREEN token)
 */
export function getTokenRequiredAmount(token: Partial<Token>): number {
    if (!token.address && !token.isNative) return 10; // Default for unknown tokens

    const knownToken = token.isNative
        ? knownTokens.ETH
        : getTokenDetailsByAddress(token.address);

    return knownToken?.requiredAmount || 10;
}
