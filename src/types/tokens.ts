/**
 * Basic token interface representing ERC-20 and native tokens
 */
export interface Token {
    name: string;
    symbol: string;
    decimals: number;
    isNative: boolean;
    address?: string;
    requiredAmount: number;
    logo?: string;
}

/**
 * Token with balance information
 */
export interface TokenContribution {
    token: Token;
    amount: number;
}
