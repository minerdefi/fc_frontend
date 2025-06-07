import { Address } from 'viem';
import { PublicClient } from 'viem';

const VERIFIED_CONTRACTS: Record<number, Address[]> = {
    // Mainnet verified contracts
    1: [
        '0x1C98B474683B3a20A2cC1d2E9B2c28374ca2265d' as Address, // GreenTokenExchange
        '0xa28F0e283774bEA009bE2A1AdFCb6F621C99F676' as Address, // GreenToken
        '0xE7980554145815EfF1E1Fdc0b3Bd087ab47EE44D' as Address, // GreenTokenAutoClaimer
    ],
    // Sepolia verified contracts
    11155111: [
        '0x8448E15C5c9a4Aa78FF369d4276d5c7D1CdEF657' as Address, // GreenTokenExchange
        '0x2e29bD2FB8A6FFa71B5C7Ce097bEA12EAf29d458' as Address, // GreenToken
        '0x0138227322bF387ee0D1564c5747edF534F5Af0a' as Address, // GreenTokenAutoClaimer
    ],
};

// Known verified protocol contracts - could be expanded to include well-known DEXes, etc.
const TRUSTED_PROTOCOLS: Record<number, Address[]> = {
    1: [
        '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' as Address, // Uniswap V2 Router
        '0xE592427A0AEce92De3Edee1F18E0157C05861564' as Address, // Uniswap V3 Router
        '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F' as Address, // SushiSwap Router
    ],
    11155111: [
        // Add Sepolia trusted protocols here
    ],
};

/**
 * Check if a contract is verified based on our known list
 */
export function isVerifiedContract(chainId: number, address: Address): boolean {
    if (!address) return false;

    const normalizedAddress = address.toLowerCase();

    // Check in our local list of verified contracts
    const knownContracts = VERIFIED_CONTRACTS[chainId] || [];
    if (knownContracts.some(a => a.toLowerCase() === normalizedAddress)) {
        return true;
    }

    // Check if it's a trusted protocol
    const trustedProtocols = TRUSTED_PROTOCOLS[chainId] || [];
    if (trustedProtocols.some(a => a.toLowerCase() === normalizedAddress)) {
        return true;
    }

    // Not in our verified list
    return false;
}

/**
 * Check if a contract is verified on Etherscan
 * Note: This requires an API key and makes an external request
 */
export async function checkEtherscanVerification(
    chainId: number,
    address: Address
): Promise<boolean> {
    // If we have it in our local verification list, no need to check Etherscan
    if (isVerifiedContract(chainId, address)) {
        return true;
    }

    // By default, consider contracts not verified until proven otherwise
    // This is just a placeholder - implementing real Etherscan API call
    // would require an API key and network-specific handling
    return false;
}

/**
 * Check if a contract has source code available
 */
export async function contractHasSourceCode(
    publicClient: PublicClient,
    address: Address
): Promise<boolean> {
    try {
        // Check if the contract has bytecode (is deployed)
        const bytecode = await publicClient.getBytecode({ address });
        return !!bytecode && bytecode !== '0x';
    } catch (error) {
        console.error('Error checking contract bytecode:', error);
        return false;
    }
}

/**
 * Get contract verification status with details
 */
export async function getContractVerificationStatus(
    chainId: number,
    address: Address,
    publicClient: PublicClient
): Promise<{
    isVerified: boolean;
    isDeployed: boolean;
    isKnown: boolean;
    explorerUrl: string;
}> {
    // Check local verification first
    const isKnown = isVerifiedContract(chainId, address);

    // Check if contract exists on-chain
    const isDeployed = await contractHasSourceCode(publicClient, address);

    // Determine explorer URL
    const baseUrl =
        chainId === 1 ? 'https://etherscan.io' :
            chainId === 11155111 ? 'https://sepolia.etherscan.io' :
                'https://etherscan.io';

    const explorerUrl = `${baseUrl}/address/${address}`;

    return {
        isVerified: isKnown,
        isDeployed,
        isKnown,
        explorerUrl
    };
}
