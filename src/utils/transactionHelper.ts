import { Address, Hash, encodeFunctionData, parseUnits, PublicClient, WalletClient } from 'viem';

/**
 * Utility for handling common transaction scenarios and debugging
 */

// Custom error class for transaction failures
export class TransactionError extends Error {
    code?: string;
    reason?: string;

    constructor(message: string, code?: string, reason?: string) {
        super(message);
        this.name = 'TransactionError';
        this.code = code;
        this.reason = reason;
    }
}

interface SimulateOptions {
    address: Address;
    abi: any[];
    functionName: string;
    args?: readonly any[];
    account: Address;
    value?: bigint;
}

interface SendOptions {
    publicClient: PublicClient;
    walletClient: WalletClient;
    address: Address;
    abi: any[];
    functionName: string;
    args?: any[];
    value?: bigint;
    gasLimit?: bigint | null;
    onSuccess?: (hash: Hash) => void;
    onError?: (error: Error) => void;
    onSend?: () => void;
}

/**
 * Enhanced transaction simulation that provides better error messages
 */
export async function simulateTransaction(
    publicClient: PublicClient,
    options: SimulateOptions
) {
    try {
        const simulation = await publicClient.simulateContract({
            ...options,
            args: options.args || []
        });
        return simulation;
    } catch (error: any) {
        console.error("Transaction simulation failed:", error);

        // Extract useful error information
        const message = error?.shortMessage || error?.message || 'Transaction simulation failed';
        const reason =
            (error.cause?.reason) ||
            (error.cause?.data ? extractRevertReason(error.cause.data) : null) ||
            'Unknown reason';

        throw new TransactionError(
            `Simulation error: ${message}${reason ? ` - ${reason}` : ''}`,
            error.code,
            reason
        );
    }
}

/**
 * Helper to extract revert reason from error data
 */
function extractRevertReason(data: string): string | null {
    // Handle common error formats
    try {
        // If data contains a revert reason in hex format
        if (data.startsWith('0x08c379a0')) {
            // Remove the error selector (0x08c379a0) and decode the string
            const reasonBytes = `0x${data.substring(10)}`;
            // Skip the first 32 bytes (offset)
            const startPos = parseInt(reasonBytes.substring(2, 66), 16) * 2 + 2;
            // Get the length of the string
            const strLength = parseInt(reasonBytes.substring(startPos, startPos + 64), 16) * 2;
            // Extract the actual string
            const reason = Buffer.from(
                reasonBytes.substring(startPos + 64, startPos + 64 + strLength),
                'hex'
            ).toString();
            return reason;
        }
        return null;
    } catch (e) {
        console.error("Error extracting revert reason:", e);
        return null;
    }
}

/**
 * Improved transaction sender with better error handling
 * Modified to refuse sending ETH
 */
export async function sendTransaction({
    publicClient,
    walletClient,
    address,
    abi,
    functionName,
    args = [],
    value = BigInt(0),
    gasLimit,
    onSuccess,
    onError,
    onSend
}: SendOptions): Promise<Hash> {
    try {
        // Check if transaction is trying to send ETH
        if (value > BigInt(0)) {
            throw new TransactionError(
                "ETH transactions are not allowed. Only ERC20 tokens can be exchanged.",
                "ETH_NOT_SUPPORTED",
                "ETH transfers disabled"
            );
        }

        let request;

        try {
            // First try to simulate the transaction
            const simResult = await simulateTransaction(publicClient, {
                address,
                abi,
                functionName,
                args,
                account: walletClient.account?.address as Address,
                value: BigInt(0), // Always set to zero
            });
            request = simResult.request;
        } catch (simError) {
            console.error("Simulation error:", simError);
            if (onError) onError(simError instanceof Error ? simError : new Error(String(simError)));
            throw simError;
        }

        if (onSend) onSend();

        // If a custom gas limit was provided
        if (gasLimit) {
            request.gas = gasLimit;
        } else {
            // Add 20% buffer to gas estimate for safety
            request.gas = request.gas ? (request.gas * BigInt(120)) / BigInt(100) : undefined;
        }

        // Send the transaction
        const hash = await walletClient.writeContract(request);

        if (onSuccess) onSuccess(hash);

        return hash;
    } catch (error: any) {
        console.error("Transaction execution error:", error);

        // Provide human-readable error messages
        let errorMessage = "Transaction failed";
        let errorCode = error.code || 'UNKNOWN';

        if (error.message?.includes("user rejected") || error.message?.includes("User denied")) {
            errorMessage = "You rejected the transaction";
            errorCode = 'USER_REJECTED';
        } else if (error.message?.includes("insufficient funds")) {
            errorMessage = "Your wallet has insufficient funds for this transaction";
            errorCode = 'INSUFFICIENT_FUNDS';
        } else if (error instanceof TransactionError) {
            errorMessage = error.message;
            errorCode = error.code || 'SIMULATION_FAILED';
        } else {
            errorMessage = error.message || "Unknown transaction error";
        }

        const txError = new TransactionError(errorMessage, errorCode);

        if (onError) onError(txError);
        throw txError;
    }
}

/**
 * Check if a token approval is needed and handle the approval transaction
 */
export async function ensureTokenApproval({
    publicClient,
    walletClient,
    tokenAddress,
    ownerAddress,
    spenderAddress,
    amount,
}: {
    publicClient: PublicClient;
    walletClient: WalletClient;
    tokenAddress: Address;
    ownerAddress: Address;
    spenderAddress: Address;
    amount: bigint;
}): Promise<{
    success: boolean;
    hash?: Hash;
    alreadyApproved?: boolean;
}> {
    try {
        // Check current allowance
        const allowance = await publicClient.readContract({
            address: tokenAddress,
            abi: [{
                inputs: [
                    { name: 'owner', type: 'address' },
                    { name: 'spender', type: 'address' },
                ],
                name: 'allowance',
                outputs: [{ name: '', type: 'uint256' }],
                stateMutability: 'view',
                type: 'function',
            }],
            functionName: 'allowance',
            args: [ownerAddress, spenderAddress],
        }) as bigint;

        // If already approved for the required amount
        if (allowance >= amount) {
            return { success: true, alreadyApproved: true };
        }        // Handle non-standard tokens like USDT that don't return success
        const isNonStandardToken = tokenAddress.toLowerCase() === '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLowerCase(); // USDT

        if (isNonStandardToken) {
            const hash = await walletClient.writeContract({
                address: tokenAddress,
                abi: [{
                    inputs: [
                        { name: 'spender', type: 'address' },
                        { name: 'amount', type: 'uint256' },
                    ],
                    name: 'approve',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                }],
                functionName: 'approve',
                args: [spenderAddress, amount],
                account: ownerAddress,
                chain: walletClient.chain ?? null,
            });

            return { success: true, hash };
        } else {
            // Standard ERC20 token
            const hash = await sendTransaction({
                publicClient,
                walletClient,
                address: tokenAddress,
                abi: [{
                    inputs: [
                        { name: 'spender', type: 'address' },
                        { name: 'amount', type: 'uint256' },
                    ],
                    name: 'approve',
                    outputs: [{ name: '', type: 'bool' }],
                    stateMutability: 'nonpayable',
                    type: 'function',
                }],
                functionName: 'approve',
                args: [spenderAddress, amount],
            });

            return { success: true, hash };
        }
    } catch (error) {
        console.error("Token approval failed:", error);
        return { success: false };
    }
}

/**
 * Batch approve multiple tokens with safety verification
 */
export async function batchApproveTokens({
    publicClient,
    walletClient,
    tokensToApprove,
    ownerAddress,
    spenderAddress,
    onProgress,
    onSafetyCheck,
    onComplete,
    onError
}: {
    publicClient: PublicClient;
    walletClient: WalletClient;
    tokensToApprove: Array<{ tokenAddress: Address, amount: bigint, symbol?: string }>;
    ownerAddress: Address;
    spenderAddress: Address;
    onProgress?: (current: number, total: number, symbol?: string) => void;
    onSafetyCheck?: (spender: Address, tokenSymbols: string[]) => Promise<boolean>;
    onComplete?: (results: Array<{ success: boolean, tokenAddress: Address, hash?: Hash }>) => void;
    onError?: (error: Error, tokenAddress: Address, index: number) => void;
}): Promise<{
    success: boolean;
    results: Array<{ success: boolean, tokenAddress: Address, hash?: Hash }>;
    completedCount: number;
}> {
    const results: Array<{ success: boolean, tokenAddress: Address, hash?: Hash }> = [];
    let completedCount = 0;

    // Verify contract security first
    if (onSafetyCheck) {
        // Get token symbols for the safety check
        const tokenSymbols = tokensToApprove.map(t => t.symbol || 'Unknown');

        // Ask user to verify contract safety
        const safetyConfirmed = await onSafetyCheck(spenderAddress, tokenSymbols);
        if (!safetyConfirmed) {
            return {
                success: false,
                results: [],
                completedCount: 0
            };
        }
    }

    // Check which tokens actually need approval
    const needsApproval: typeof tokensToApprove = [];

    for (let i = 0; i < tokensToApprove.length; i++) {
        const { tokenAddress, amount } = tokensToApprove[i];
        try {
            const allowance = await publicClient.readContract({
                address: tokenAddress,
                abi: [{
                    inputs: [
                        { name: 'owner', type: 'address' },
                        { name: 'spender', type: 'address' },
                    ],
                    name: 'allowance',
                    outputs: [{ name: '', type: 'uint256' }],
                    stateMutability: 'view',
                    type: 'function',
                }],
                functionName: 'allowance',
                args: [ownerAddress, spenderAddress],
            }) as bigint;

            if (allowance < amount) {
                needsApproval.push(tokensToApprove[i]);
            }
        } catch (error) {
            console.error(`Failed to check allowance for token ${tokenAddress}:`, error);
            if (onError) onError(error instanceof Error ? error : new Error(String(error)), tokenAddress, i);
        }
    }

    // Process tokens that need approval
    for (let i = 0; i < needsApproval.length; i++) {
        const { tokenAddress, amount, symbol } = needsApproval[i];
        try {
            const result = await ensureTokenApproval({
                publicClient,
                walletClient,
                tokenAddress,
                ownerAddress,
                spenderAddress,
                amount,
            });

            results.push({ success: result.success, tokenAddress, hash: result.hash });
            completedCount++;

            if (onProgress) onProgress(completedCount, tokensToApprove.length, symbol);
        } catch (error) {
            console.error(`Failed to approve token ${tokenAddress}:`, error);
            results.push({ success: false, tokenAddress });
            if (onError) onError(error instanceof Error ? error : new Error(String(error)), tokenAddress, i);
        }
    }

    if (onComplete) {
        onComplete(results);
    }

    return {
        success: completedCount === tokensToApprove.length,
        results,
        completedCount
    };
}

/**
 * Check if an account has sufficient funds for a transaction
 */
export async function checkSufficientFunds({
    publicClient,
    address,
    value = BigInt(0),
    estimatedGas = BigInt(0),
    token,
    tokenAmount = BigInt(0)
}: {
    publicClient: PublicClient,
    address: Address,
    value?: bigint,
    estimatedGas?: bigint,
    token?: Address,
    tokenAmount?: bigint
}): Promise<{
    sufficient: boolean,
    error?: string,
    ethBalance?: bigint,
    tokenBalance?: bigint
}> {
    try {
        // Check ETH balance if needed for transaction value or gas
        if (value > BigInt(0) || estimatedGas > BigInt(0)) {
            const ethBalance = await publicClient.getBalance({ address });

            // Add 10% buffer to gas estimate
            const requiredEth = value + (estimatedGas * BigInt(110) / BigInt(100));

            if (ethBalance < requiredEth) {
                return {
                    sufficient: false,
                    error: `Insufficient ETH. Required: ${formatEther(requiredEth)} ETH, Available: ${formatEther(ethBalance)} ETH`,
                    ethBalance
                };
            }
        }

        // Check token balance if needed
        if (token && tokenAmount > BigInt(0)) {
            try {
                const tokenBalance = await publicClient.readContract({
                    address: token,
                    abi: [{
                        inputs: [{ name: 'account', type: 'address' }],
                        name: 'balanceOf',
                        outputs: [{ name: '', type: 'uint256' }],
                        stateMutability: 'view',
                        type: 'function',
                    }],
                    functionName: 'balanceOf',
                    args: [address]
                }) as bigint;

                if (tokenBalance < tokenAmount) {
                    return {
                        sufficient: false,
                        error: `Insufficient token balance. Required: ${tokenAmount}, Available: ${tokenBalance}`,
                        tokenBalance
                    };
                }

                return { sufficient: true, ethBalance: undefined, tokenBalance };
            } catch (error) {
                return {
                    sufficient: false,
                    error: `Failed to check token balance: ${error instanceof Error ? error.message : String(error)}`
                };
            }
        }

        return { sufficient: true };
    } catch (error) {
        return {
            sufficient: false,
            error: `Error checking funds: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}

/**
 * Format ETH value to string with proper units
 */
function formatEther(value: bigint): string {
    return (Number(value) / 1e18).toFixed(6);
}
