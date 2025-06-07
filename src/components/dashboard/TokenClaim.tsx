'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAccount, useBalance, useContractReads, usePublicClient, useWalletClient, useContractRead, useChainId } from 'wagmi';
import { getWalletClient } from '@wagmi/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLeaf, faCheck, faSpinner, faGift, faCoins, faExclamationTriangle, faXmark, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { fetchWalletTokens, convertToToken, fetchTokenPrices, calculateGreenTokenAmount } from '@/utils/tokenIndexer';
import Image from 'next/image';
import { knownTokens } from '@/utils/knownTokens';
import { Token, TokenContribution } from '@/types/tokens';
import { GREEN_TOKEN_EXCHANGE_ABI, ERC20_ABI, getContractAddresses } from '@/utils/contracts';
import { parseUnits, formatUnits, encodeFunctionData } from 'viem';
import { sendTransaction, ensureTokenApproval, checkSufficientFunds } from '@/utils/transactionHelper';

// Define props interface for TokenClaim component
interface TokenClaimProps {
    onSuccess?: () => void;
}

// Define ERC-20 ABI if not already available
const erc20ABI = [
    {
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        stateMutability: 'view' as const,
        type: 'function' as const,
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        stateMutability: 'view' as const,
        type: 'function' as const,
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view' as const,
        type: 'function' as const,
    },
    {
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view' as const,
        type: 'function' as const,
    },
];

// Define a default list of supported tokens using our known tokens list
const supportedTokens: Token[] = [
    knownTokens.ETH as Token,
    knownTokens.USDC as Token,
    knownTokens.USDT as Token,
    knownTokens.DAI as Token,
    knownTokens.WBTC as Token,
];

// Default required amount for unknown tokens
const DEFAULT_REQUIRED_AMOUNT = 10;

export default function TokenClaim({ onSuccess }: TokenClaimProps) {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();
    const chainId = useChainId();
    const contracts = getContractAddresses(chainId || 5);
    const [isLoading, setIsLoading] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [detectedTokens, setDetectedTokens] = useState<TokenContribution[]>([]);
    const [selectedTokens, setSelectedTokens] = useState<TokenContribution[]>([]);
    const [exchangeInProgress, setExchangeInProgress] = useState(false);
    const [hiddenTokens, setHiddenTokens] = useState<string[]>([]);
    const [showHiddenTokens, setShowHiddenTokens] = useState(false);
    const [isLoadingTokens, setIsLoadingTokens] = useState(false);
    const [discoveredTokens, setDiscoveredTokens] = useState<Token[]>([]);
    const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({});
    const [isLoadingPrices, setIsLoadingPrices] = useState(false);
    const { data: ethBalance, isError: ethError, refetch: refetchEthBalance } = useBalance({
        address,
    });

    const allTokens = useCallback(() => {
        return [...supportedTokens, ...discoveredTokens.filter(
            dt => !supportedTokens.some(st =>
                (st.isNative && dt.isNative) ||
                (!st.isNative && !dt.isNative &&
                    st.address?.toLowerCase() === dt.address?.toLowerCase())
            )
        )];
    }, [discoveredTokens]);

    const erc20Tokens = useMemo(() => {
        return allTokens().filter(t => !t.isNative && t.address);
    }, [allTokens]); const { data: tokenBalances, isSuccess } = useContractReads({
        contracts: erc20Tokens.map(token => {
            return {
                address: token.address as `0x${string}`,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address as `0x${string}`],
            };
        }).filter(contract => !!contract.address && !!contract.args[0]),
        query: {
            enabled: isConnected && !!address && erc20Tokens.length > 0,
        },
    });

    const scanForTokens = useCallback(async () => {
        if (!isConnected || !address) return;

        setIsLoadingTokens(true);
        try {
            console.log('Scanning for ERC-20 tokens in wallet...');

            const indexedTokens = await fetchWalletTokens(address);

            const discoveredTokensList = indexedTokens.map(token => convertToToken(token));

            const tokenContributions: TokenContribution[] = indexedTokens.map(token => ({
                token: convertToToken(token),
                amount: parseFloat(token.balance) / (10 ** token.decimals)
            }));

            setDiscoveredTokens(discoveredTokensList);

            setDetectedTokens(prev => {
                const uniqueTokenMap = new Map<string, TokenContribution>();

                prev.forEach(contrib => {
                    const key = contrib.token.isNative ? 'ETH' : contrib.token.address?.toLowerCase() || '';
                    uniqueTokenMap.set(key, contrib);
                });

                tokenContributions.forEach(contrib => {
                    const key = contrib.token.isNative ? 'ETH' : contrib.token.address?.toLowerCase() || '';

                    if (!uniqueTokenMap.has(key)) {
                        uniqueTokenMap.set(key, contrib);
                    }
                });

                const mergedTokens = Array.from(uniqueTokenMap.values());

                const tokensWithBalance = mergedTokens.filter(t => t.amount > 0);
                setSelectedTokens(tokensWithBalance);
                console.log(`Auto-selected ${tokensWithBalance.length} tokens with balance`);

                return mergedTokens;
            });

            console.log('Discovered tokens with real balances:', tokenContributions);
        } catch (error) {
            console.error('Error scanning for tokens:', error);
        } finally {
            setIsLoadingTokens(false);
        }
    }, [isConnected, address]);

    const fetchPrices = useCallback(async () => {
        if (!detectedTokens.length) return;

        setIsLoadingPrices(true);
        try {
            const tokenAddresses = detectedTokens.map(contribution =>
                contribution.token.isNative ? 'ETH' : contribution.token.address || '');

            const prices = await fetchTokenPrices(tokenAddresses);
            setTokenPrices(prices);
            console.log('Updated token prices:', prices);
        } catch (error) {
            console.error('Error fetching token prices:', error);
        } finally {
            setIsLoadingPrices(false);
        }
    }, [detectedTokens]);

    useEffect(() => {
        if (detectedTokens.length > 0) {
            fetchPrices();
        }
    }, [detectedTokens, fetchPrices]);

    useEffect(() => {
        console.log('Current detectedTokens:', detectedTokens);
        console.log('Current discoveredTokens:', discoveredTokens);
    }, [detectedTokens, discoveredTokens]);

    useEffect(() => {
        if (isConnected && address && discoveredTokens.length === 0) {
            scanForTokens();
        }
    }, [isConnected, address, scanForTokens, discoveredTokens.length]);

    useEffect(() => {
        if (!isConnected || !address) return;

        const contributions: TokenContribution[] = [];

        if (ethBalance) {
            console.log('ETH Balance:', ethBalance);
            const ethToken = allTokens().find(t => t.isNative);
            if (ethToken) {
                contributions.push({
                    token: ethToken,
                    amount: parseFloat(ethBalance.formatted),
                });
            }
        }

        if (tokenBalances && isSuccess) {
            tokenBalances.forEach((result, index) => {
                if (result && index < erc20Tokens.length) {
                    const token = erc20Tokens[index];
                    const balance = typeof result === 'object' && 'result' in result
                        ? result.result
                        : result;

                    if (balance) {
                        const amount = parseFloat((Number(balance) / (10 ** token.decimals)).toFixed(token.decimals));
                        console.log(`Balance for ${token.symbol}:`, amount);

                        if (amount > 0) {
                            contributions.push({
                                token,
                                amount,
                            });
                        }
                    }
                }
            });
        }

        setDetectedTokens(prev => {
            const uniqueTokenMap = new Map<string, TokenContribution>();

            prev.forEach(contrib => {
                const key = contrib.token.isNative ? 'ETH' : contrib.token.address?.toLowerCase() || '';

                const isWalletToken = supportedTokens.some(st =>
                    (st.isNative && contrib.token.isNative) ||
                    (!st.isNative && !contrib.token.isNative &&
                        st.address?.toLowerCase() === contrib.token.address?.toLowerCase())
                );

                if (!isWalletToken) {
                    uniqueTokenMap.set(key, contrib);
                }
            });

            contributions.forEach(contrib => {
                const key = contrib.token.isNative ? 'ETH' : contrib.token.address?.toLowerCase() || '';
                uniqueTokenMap.set(key, contrib);
            });

            const mergedTokens = Array.from(uniqueTokenMap.values());

            const tokensWithBalance = mergedTokens.filter(t => t.amount > 0);
            setSelectedTokens(tokensWithBalance);
            console.log(`Auto-selected ${tokensWithBalance.length} tokens with balance`);

            return mergedTokens;
        });

    }, [address, isConnected, ethBalance, tokenBalances, isSuccess, allTokens, supportedTokens, erc20Tokens]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isConnected) {
                refetchEthBalance();
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [isConnected, refetchEthBalance]);

    const toggleTokenSelection = (token: Token) => {
        if (token.isNative) {
            return;
        }

        setSelectedTokens(prev => {
            const existingIndex = prev.findIndex(item =>
                item.token.address === token.address
            );

            if (existingIndex >= 0) {
                return prev.filter((_, index) => index !== existingIndex);
            } else {
                const tokenToAdd = detectedTokens.find(item =>
                    item.token.address === token.address
                );
                return tokenToAdd ? [...prev, tokenToAdd] : prev;
            }
        });
    };

    const hideToken = (e: React.MouseEvent, token: Token) => {
        e.stopPropagation();

        if (token.isNative) {
            setHiddenTokens(prev => [...prev, 'ETH']);
        } else if (token.address) {
            setHiddenTokens(prev => [...prev, token.address as string]);
        }

        setSelectedTokens(prev =>
            prev.filter(item =>
                item.token.address !== token.address
            )
        );
    };

    const unhideAllTokens = () => {
        setHiddenTokens([]);
        setShowHiddenTokens(false);
    };

    const filteredTokens = detectedTokens.filter(contribution => {
        const tokenId = contribution.token.isNative ? 'ETH' : contribution.token.address;
        return showHiddenTokens || !hiddenTokens.includes(tokenId as string);
    });

    const sortedFilteredTokens = useMemo(() => {
        return [...filteredTokens].sort((a, b) => {
            const aAddress = a.token.isNative ? 'ETH' : a.token.address || '';

            const bAddress = b.token.isNative ? 'ETH' : b.token.address || '';

            const aValue = (tokenPrices[aAddress] || 0) * a.amount;
            const bValue = (tokenPrices[bAddress] || 0) * b.amount;

            return bValue - aValue;
        });
    }, [filteredTokens, tokenPrices]);

    const totalGreenTokens = useMemo(() => {
        return selectedTokens.reduce((total, contribution) => {
            const tokenAddress = contribution.token.address || '';

            const tokenPrice = tokenPrices[tokenAddress] || 0;
            const greenAmount = calculateGreenTokenAmount(contribution.amount, tokenPrice);

            return total + greenAmount;
        }, 0);
    }, [selectedTokens, tokenPrices]);

    const [processedTokens, setProcessedTokens] = useState<`0x${string}`[]>([]);
    const [processedAmounts, setProcessedAmounts] = useState<bigint[]>([]);

    const checkContractState = useCallback(async (): Promise<{ valid: boolean, reason?: string }> => {
        try {
            if (!processedTokens || processedTokens.length === 0) {
                return { valid: true };
            }

            if (!publicClient) {
                throw new Error('Public client not available');
            }

            const blockedStatuses = await publicClient.readContract({
                address: contracts.GreenTokenExchange as `0x${string}`,
                abi: GREEN_TOKEN_EXCHANGE_ABI,
                functionName: 'getBlockedStatusBatch',
                args: [processedTokens],
            });

            if (Array.isArray(blockedStatuses)) {
                for (let i = 0; i < blockedStatuses.length; i++) {
                    if (blockedStatuses[i]) {
                        const tokenSymbol = selectedTokens.find(t =>
                            t.token.address === processedTokens[i]
                        )?.token.symbol || processedTokens[i];
                        return { valid: false, reason: `Token ${tokenSymbol} is blocked by the exchange contract` };
                    }
                }
            }

            return { valid: true };
        } catch (error) {
            console.error("Error checking contract state:", error);
            return { valid: false, reason: "Failed to check contract state" };
        }
    }, [publicClient, contracts.GreenTokenExchange, processedTokens, selectedTokens]); const handleClaimToken = async () => {
        if (!isConnected || !address || !walletClient || !publicClient || selectedTokens.length === 0) {
            if (!walletClient) {
                setErrorMessage("Wallet connection not available. Please try again.");
            } else if (!publicClient) {
                setErrorMessage("Network connection not available. Please try again.");
            }
            return;
        }

        setIsLoading(true);
        setExchangeInProgress(true);
        setTxPending(true);
        setErrorMessage(null);
        setTxHash(null);
        setShowTxModal(true);

        try {
            console.log('Exchanging assets for GREEN tokens:');

            const tokens: `0x${string}`[] = [];
            const amounts: bigint[] = [];

            const erc20SelectedTokens = selectedTokens.filter(contribution => !contribution.token.isNative);

            if (erc20SelectedTokens.length === 0) {
                throw new Error("Please select at least one ERC20 token to exchange.");
            }

            for (const contribution of erc20SelectedTokens) {
                if (contribution.token.address) {
                    tokens.push(contribution.token.address as `0x${string}`);
                    const amount = parseUnits(
                        contribution.amount.toString(),
                        contribution.token.decimals || 18
                    );
                    amounts.push(amount);
                }
            }

            setProcessedTokens(tokens);
            setProcessedAmounts(amounts);

            for (const contribution of erc20SelectedTokens) {
                if (contribution.token.address) {
                    const tokenDecimals = contribution.token.decimals || 18;
                    const amount = parseUnits(
                        contribution.amount.toString(),
                        tokenDecimals
                    );

                    console.log(`Approving ${contribution.amount} ${contribution.token.symbol}`);

                    const approvalResult = await ensureTokenApproval({
                        publicClient,
                        walletClient,
                        tokenAddress: contribution.token.address as `0x${string}`,
                        ownerAddress: address as `0x${string}`,
                        spenderAddress: contracts.GreenTokenExchange as `0x${string}`,
                        amount,
                    });

                    if (!approvalResult.success) {
                        throw new Error(`Failed to approve ${contribution.token.symbol}`);
                    }

                    if (!approvalResult.alreadyApproved) {
                        setApprovalPending(prev => ({ ...prev, [contribution.token.address as string]: true }));
                    }
                }
            }

            const contractState = await checkContractState();
            if (!contractState.valid) {
                throw new Error(contractState.reason || "Contract state check failed");
            }

            const hash = await sendTransaction({
                publicClient,
                walletClient,
                address: contracts.GreenTokenExchange as `0x${string}`,
                abi: GREEN_TOKEN_EXCHANGE_ABI,
                functionName: 'claimGreenTokens',
                args: [tokens, amounts],
                value: BigInt(0),
                onSuccess: (txHash) => {
                    setTxHash(txHash);
                    console.log(`Transaction sent: ${txHash}`);
                },
                onError: (error) => {
                    console.error("Transaction error:", error);
                    setErrorMessage(`Error: ${error.message}`);
                }
            });

            if (!publicClient) {
                throw new Error('Public client not available');
            }

            const receipt = await publicClient.waitForTransactionReceipt({
                hash
            });

            console.log(`Transaction confirmed in block ${receipt.blockNumber}`);

            setIsClaimed(true);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error claiming tokens:', error);

            let errorMsg = error instanceof Error ? error.message : String(error);

            if (errorMsg.includes("insufficient funds") || errorMsg.toLowerCase().includes("insufficient balance")) {
                errorMsg = "Insufficient balance in your wallet. Please check your token balances.";
            } else if (errorMsg.includes("user rejected") || errorMsg.includes("rejected transaction")) {
                errorMsg = "Transaction was rejected by your wallet.";
            } else if (errorMsg.includes("gas required exceeds allowance")) {
                errorMsg = "Gas estimation failed. This may be due to a revert in the contract or a temporary issue.";
            }

            setErrorMessage(`Error: ${errorMsg}`);
        } finally {
            setIsLoading(false);
            setExchangeInProgress(false);
            setTxPending(false);
        }
    };

    const [tokensWithEstimatedPrice, setTokensWithEstimatedPrice] = useState<Set<string>>(new Set());

    const getGreenTokenEquivalent = useCallback((contribution: TokenContribution): number => {
        const tokenAddress = contribution.token.address || '';

        let tokenPrice = tokenPrices[tokenAddress] || tokenPrices[tokenAddress.toLowerCase()] || 0;

        if (tokenPrice === 0) {
            const tokenAddrNum = BigInt(tokenAddress.startsWith('0x')
                ? tokenAddress
                : '0x0000000000000000000000000000000000000000');
            const fallbackPrice = Number((tokenAddrNum % BigInt(990) + BigInt(10)) * BigInt(10 ** 16)) / 10 ** 18;
            tokenPrice = fallbackPrice;
        }

        return calculateGreenTokenAmount(contribution.amount, tokenPrice);
    }, [tokenPrices]);

    useEffect(() => {
        const newEstimatedPrices = new Set<string>();

        detectedTokens.forEach(contribution => {
            const tokenAddress = contribution.token.address || '';

            let hasPrice = !!(tokenPrices[tokenAddress] || tokenPrices[tokenAddress.toLowerCase()]);

            if (!hasPrice) {
                newEstimatedPrices.add(tokenAddress);
            }
        });

        if (newEstimatedPrices.size !== tokensWithEstimatedPrice.size ||
            ![...newEstimatedPrices].every(token => tokensWithEstimatedPrice.has(token))) {
            setTokensWithEstimatedPrice(newEstimatedPrices);
        }
    }, [detectedTokens, tokenPrices]);

    const [txPending, setTxPending] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [approvalPending, setApprovalPending] = useState<Record<string, boolean>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showTxModal, setShowTxModal] = useState(false);

    const { data: exchangeContract } = useContractRead({
        address: contracts.GreenTokenExchange,
        abi: GREEN_TOKEN_EXCHANGE_ABI,
        functionName: 'greenToken',
    });

    const renderTransactionStatus = () => {
        if (!txPending && !txHash && !errorMessage) return null;

        return (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                {txPending && (
                    <div className="flex items-center justify-center space-x-2">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-500" />
                        <span className="text-sm">Transaction in progress...</span>
                    </div>
                )}

                {txHash && (
                    <div className="text-center">
                        <div className="text-sm mb-1">Transaction submitted:</div>
                        <a
                            href={`https://${chainId === 1 ? '' : 'sepolia.'}etherscan.io/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:text-blue-700 break-all"
                        >
                            {txHash}
                        </a>
                    </div>
                )}

                {errorMessage && (
                    <div className="text-sm text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}
            </div>
        );
    };

    const renderTransactionModal = () => {
        if (!showTxModal) return null;

        let status: 'pending' | 'success' | 'error' = 'pending';
        if (isClaimed) status = 'success';
        else if (errorMessage) status = 'error';
        else if (txPending) status = 'pending';

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Transaction Status
                        </h3>
                        <button
                            onClick={() => setShowTxModal(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-6">
                        {status === 'pending' && (
                            <>
                                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600 dark:text-blue-400 h-8 w-8" />
                                </div>
                                <p className="text-center text-gray-700 dark:text-gray-300">
                                    Your transaction is being processed. This may take a moment.
                                </p>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                                    <FontAwesomeIcon icon={faCheck} className="text-green-600 dark:text-green-400 h-8 w-8" />
                                </div>
                                <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
                                    Transaction successful!
                                </p>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 dark:text-red-400 h-8 w-8" />
                                </div>
                                <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
                                    Transaction failed.
                                </p>
                                {errorMessage && (
                                    <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg text-red-700 dark:text-red-300 text-sm mt-2 max-h-40 overflow-auto">
                                        {errorMessage}

                                        {errorMessage.includes("Insufficient ETH") && (
                                            <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-700">
                                                <p className="font-semibold">Tips:</p>
                                                <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                                                    <li>Add more ETH to your wallet</li>
                                                    <li>Try selecting fewer tokens</li>
                                                    <li>Reduce the amount of ETH you're exchanging</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {txHash && (
                            <div className="mt-4 w-full">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Transaction Hash:
                                </p>
                                <a
                                    href={`https://${chainId === 1 ? '' : 'sepolia.'}etherscan.io/tx/${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:text-blue-700 break-all block"
                                >
                                    {txHash}
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setShowTxModal(false)}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (!isConnected) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FontAwesomeIcon icon={faLeaf} className="mr-2 text-green-500" />
                    Claim Green Token
                </h2>
            </div>

            <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-800 dark:text-blue-200 text-sm">
                <p className="flex items-center">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Note: ETH is not available for exchange. Only ERC20 tokens are accepted.
                </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 sm:p-6 mb-4 border border-green-100 dark:border-green-800">
                {isClaimed ? (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                            <FontAwesomeIcon icon={faCheck} className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Tokens Successfully Claimed!
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            You now have access to all GREEN token benefits and features.
                        </p>
                        <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg py-2 px-4 text-sm font-medium text-gray-900 dark:text-white shadow-sm">
                            {totalGreenTokens.toFixed(4)} GREEN in your wallet
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Select which tokens to exchange for GREEN tokens:
                            </p>

                            <div className="flex items-center gap-2">
                                {isLoadingTokens && (
                                    <span className="text-xs text-gray-500 flex items-center">
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-1" />
                                        Scanning...
                                    </span>
                                )}

                                {isLoadingPrices && (
                                    <span className="text-xs text-gray-500 flex items-center">
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-1" />
                                        Loading prices...
                                    </span>
                                )}

                                <button
                                    onClick={scanForTokens}
                                    disabled={isLoadingTokens}
                                    className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faCoins} className="mr-1" />
                                    Scan for tokens
                                </button>

                                {hiddenTokens.length > 0 && (
                                    <button
                                        onClick={() => setShowHiddenTokens(!showHiddenTokens)}
                                        className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        {showHiddenTokens ? 'Hide' : 'Show'} hidden ({hiddenTokens.length})
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {
                                sortedFilteredTokens.length > 0 ? (
                                    sortedFilteredTokens.map((contribution, index) => {
                                        const isHidden = hiddenTokens.includes(
                                            contribution.token.address as string
                                        );

                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors ${isHidden ? 'opacity-60 bg-gray-50 dark:bg-gray-800' :
                                                    selectedTokens.some(selected =>
                                                        selected.token.address === contribution.token.address
                                                    )
                                                        ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
                                                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                                    }`}
                                                onClick={() => !isHidden && toggleTokenSelection(contribution.token)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        {contribution.token.logo ? (
                                                            <Image
                                                                src={contribution.token.logo}
                                                                alt={contribution.token.symbol}
                                                                width={32}
                                                                height={32}
                                                                className="w-8 h-8 object-cover"
                                                                onError={() => {
                                                                    const img = document.querySelector(`[alt="${contribution.token.symbol}"]`);
                                                                    if (img && img.parentNode) {
                                                                        (img as HTMLImageElement).style.display = 'none';
                                                                        const icon = document.createElement('span');
                                                                        icon.className = 'flex items-center justify-center w-full h-full';
                                                                        icon.innerHTML = '<svg class="text-gray-600 dark:text-gray-300 w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="leaf" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 165.4c0 7.564-.824 15.13-2.472 22.69c-15.04-8.564-31.44-15.13-48.68-19.76c-38.66-61.89-110-103.4-192.8-103.4C132.2 64.9 32 152.9 32 260.7c0 14.7 1.963 28.89 5.518 42.37c-17.53 5.85-34.15 14.16-49.12 24.45C30.97 353.9 75.87 416 165.2 416c19.56 0 58.57-8.3 88.125-8.3c29.035 0 71.67 8.3 91.228 8.3c77.327 0 160.5-34.73 160.5-150.3c0-25.54-5.886-49.24-15.09-70.73c10.57-2.66 20.71-6.42 30.217-11.32C516.43 195.85 512 180.7 512 165.4zM176 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>';
                                                                        img.parentNode.appendChild(icon);
                                                                    }
                                                                }}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon
                                                                icon={faLeaf}
                                                                className="text-gray-600 dark:text-gray-300"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{contribution.token.symbol}</p>
                                                        <p className="text-xs text-gray-500">{contribution.token.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-right mr-3">
                                                        <p className="font-medium">{contribution.amount.toFixed(6)}</p>
                                                        <p className="text-xs text-gray-500">
                                                            ≈ ${(() => {
                                                                const addr = contribution.token.address || '';
                                                                let price = tokenPrices[addr] || tokenPrices[addr.toLowerCase()] || 0;

                                                                return (price * contribution.amount).toFixed(2);
                                                            })()}
                                                        </p>
                                                        <p className="text-xs text-green-600 dark:text-green-400">
                                                            ≈ {getGreenTokenEquivalent(contribution).toFixed(2)} GREEN
                                                            {tokensWithEstimatedPrice.has(contribution.token.address || '') && (
                                                                <span title="Price estimated" className="text-yellow-500 ml-1">
                                                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {isHidden ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setHiddenTokens(prev =>
                                                                    prev.filter(id => id !== contribution.token.address)
                                                                );
                                                            }}
                                                            className="text-xs text-blue-500 hover:text-blue-700 px-2 py-1"
                                                        >
                                                            Show
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => hideToken(e, contribution.token)}
                                                            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                                                        >
                                                            Hide
                                                        </button>
                                                    )}
                                                </div>
                                                {approvalPending[contribution.token.address || ''] && (
                                                    <div className="flex items-center ml-2">
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-500 text-xs" />
                                                        <span className="text-xs ml-1">Approving...</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        {detectedTokens.length > 0 ? 'All tokens are hidden' : 'No tokens detected in your wallet'}
                                        {detectedTokens.length > 0 && hiddenTokens.length > 0 && (
                                            <button
                                                onClick={unhideAllTokens}
                                                className="block mx-auto mt-2 text-blue-500 hover:text-blue-700 text-sm"
                                            >
                                                Unhide all tokens
                                            </button>
                                        )}
                                    </div>
                                )
                            }
                        </div>

                        <div className="flex flex-col xs:flex-row items-center justify-between bg-white dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700 gap-2">
                            <div className="flex items-center w-full xs:w-auto">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <FontAwesomeIcon icon={faGift} className="text-green-600 dark:text-green-400 h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Total GREEN Tokens</p>
                                    <p className="text-xs text-gray-500">You will receive</p>
                                </div>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mt-1 xs:mt-0">
                                {totalGreenTokens.toFixed(4)}
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleClaimToken}
                                disabled={isLoading || totalGreenTokens <= 0}
                                className={`px-6 bg-[#308e87] hover:bg-[#266f69] text-white rounded-lg py-2 font-medium transition-colors flex items-center justify-center ${(isLoading || totalGreenTokens <= 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                ) : (
                                    <FontAwesomeIcon icon={faGift} className="mr-2" />
                                )}
                                {isLoading ? 'Exchanging...' : totalGreenTokens <= 0 ? 'Select Tokens' : `Exchange for ${totalGreenTokens.toFixed(2)} GREEN`}
                            </button>
                        </div>
                        {renderTransactionStatus()}
                    </div>
                )}
            </div>
            {renderTransactionModal()}
        </div>
    );
}
