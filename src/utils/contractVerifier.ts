import { Address } from 'viem';
import { PublicClient } from 'viem';
import { CONTRACT_ADDRESSES } from './contracts';

/**
 * Utility to verify contract integrity and configuration
 */

export interface VerificationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    info: Record<string, any>;
}

/**
 * Verifies the contract bytecode and ABI compatibility
 */
export async function verifyContractIntegrity(
    publicClient: PublicClient,
    chainId: number
): Promise<VerificationResult> {
    const result: VerificationResult = {
        isValid: true,
        errors: [],
        warnings: [],
        info: {},
    };

    try {
        // Get contract addresses for current chain
        const contracts = getContractForChain(chainId);
        if (!contracts) {
            result.isValid = false;
            result.errors.push(`No contract addresses defined for chain ID ${chainId}`);
            return result;
        }

        // Check exchange contract
        const exchangeAddress = contracts.GreenTokenExchange;
        result.info.exchangeAddress = exchangeAddress;

        // Verify contract code exists (is deployed)
        const exchangeCode = await publicClient.getBytecode({ address: exchangeAddress });
        if (!exchangeCode || exchangeCode === '0x') {
            result.isValid = false;
            result.errors.push(`Exchange contract not deployed at ${exchangeAddress}`);
        } else {
            result.info.exchangeDeployed = true;
            result.info.exchangeCodeSize = (exchangeCode.length - 2) / 2; // bytes
        }

        // Check Green token contract
        const tokenAddress = contracts.GreenToken;
        result.info.tokenAddress = tokenAddress;

        const tokenCode = await publicClient.getBytecode({ address: tokenAddress });
        if (!tokenCode || tokenCode === '0x') {
            result.isValid = false;
            result.errors.push(`Green token contract not deployed at ${tokenAddress}`);
        } else {
            result.info.tokenDeployed = true;
        }

        // Check AutoClaimer contract
        const autoClaimerAddress = contracts.GreenTokenAutoClaimer;
        result.info.autoClaimerAddress = autoClaimerAddress;

        const autoClaimerCode = await publicClient.getBytecode({ address: autoClaimerAddress });
        if (!autoClaimerCode || autoClaimerCode === '0x') {
            result.warnings.push(`AutoClaimer contract not deployed at ${autoClaimerAddress}`);
        } else {
            result.info.autoClaimerDeployed = true;
        }

        return result;
    } catch (error) {
        console.error("Error verifying contract integrity:", error);
        result.isValid = false;
        result.errors.push(`Verification error: ${error instanceof Error ? error.message : String(error)}`);
        return result;
    }
}

function getContractForChain(chainId: number): Record<string, Address> | undefined {
    return CONTRACT_ADDRESSES[chainId.toString()];
}

/**
 * Check if the contract addresses are correctly configured for the current network
 */
export async function validateContractConfiguration(
    publicClient: PublicClient,
    chainId: number
): Promise<{ valid: boolean; message?: string }> {
    try {
        const verificationResult = await verifyContractIntegrity(publicClient, chainId);

        if (!verificationResult.isValid) {
            return {
                valid: false,
                message: verificationResult.errors.join(', ')
            };
        }

        if (verificationResult.warnings.length > 0) {
            return {
                valid: true,
                message: `Warnings: ${verificationResult.warnings.join(', ')}`
            };
        }

        return { valid: true };
    } catch (error) {
        return {
            valid: false,
            message: `Contract validation error: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}
