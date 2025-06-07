import { formatUnits, parseUnits } from 'viem';
import { PublicClient } from 'viem';

/**
 * Gas utilities for managing transactions and estimating gas costs
 */

/**
 * Calculate the maximum ETH amount that can be spent in a transaction while reserving gas
 * @param walletBalance The total ETH balance in the wallet
 * @param gasEstimate The estimated gas cost in wei
 * @param safetyFactor A multiplier to add a safety margin (1.1 = 10% extra)
 * @returns The maximum amount of ETH that can be safely spent
 */
export function calculateMaxEthSpend(
    walletBalance: bigint,
    gasEstimate: bigint,
    safetyFactor: number = 1.2
): bigint {
    // Convert safety factor to fixed-point calculation
    const safetyFactorFixed = BigInt(Math.floor(safetyFactor * 1000));

    // Calculate gas with safety margin
    const gasWithSafety = (gasEstimate * safetyFactorFixed) / BigInt(1000);

    // Ensure walletBalance is greater than gas estimate
    if (walletBalance <= gasWithSafety) {
        return BigInt(0);
    }

    // Return max amount that can be spent
    return walletBalance - gasWithSafety;
}

/**
 * Calculate current gas price with a buffer
 * @param publicClient The public client from wagmi
 * @param buffer Percentage buffer (e.g., 10 for 10% buffer)
 * @returns Gas price in wei with buffer added
 */
export async function getGasPriceWithBuffer(
    publicClient: PublicClient,
    buffer: number = 10
): Promise<bigint> {
    try {
        const gasPrice = await publicClient.getGasPrice();
        const bufferMultiplier = 100 + buffer;
        return (gasPrice * BigInt(bufferMultiplier)) / BigInt(100);
    } catch (error) {
        console.error("Error fetching gas price:", error);
        // Default to a reasonable gas price if fetch fails (e.g., 20 gwei)
        return parseUnits('20', 9);
    }
}

/**
 * Format a human-readable gas summary 
 * @param gasCost The gas cost in wei
 * @param gasLimit The gas limit in units
 * @param gasPrice The gas price in wei
 * @returns A formatted summary string
 */
export function formatGasSummary(
    gasCost: bigint,
    gasLimit: bigint,
    gasPrice: bigint
): string {
    return `Gas cost: ${formatUnits(gasCost, 18)} ETH (${formatUnits(gasLimit, 0)} units @ ${formatUnits(gasPrice, 9)} gwei)`;
}

/**
 * Suggest a gas buffer based on network congestion 
 * @param publicClient The public client
 * @returns Recommended buffer percentage
 */
export async function suggestGasBuffer(publicClient: PublicClient): Promise<number> {
    try {
        // For ETH mainnet, we can use gas price to determine congestion
        const gasPrice = await publicClient.getGasPrice();
        const gasPriceGwei = Number(formatUnits(gasPrice, 9));

        // Simple heuristic - adjust as needed
        if (gasPriceGwei > 200) return 30; // Very high congestion
        if (gasPriceGwei > 100) return 20; // High congestion
        if (gasPriceGwei > 50) return 15;  // Moderate congestion
        return 10; // Normal conditions
    } catch (error) {
        console.error("Error suggesting gas buffer:", error);
        return 15; // Default to moderate buffer
    }
}
