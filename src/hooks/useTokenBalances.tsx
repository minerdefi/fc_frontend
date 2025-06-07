'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAccount, useBalance, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { TokenContribution, Token } from '@/types/tokens';
import { ERC20_ABI } from '@/utils/contracts';

interface UseTokenBalancesProps {
  tokens: Token[];
  enabled?: boolean;
  refreshInterval?: number;
}

export function useTokenBalances({
  tokens,
  enabled = true,
  refreshInterval = 15000,
}: UseTokenBalancesProps) {
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState<TokenContribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Separate native tokens from ERC20 tokens
  const nativeTokens = tokens.filter(token => token.isNative);
  const erc20Tokens = tokens.filter(token => !token.isNative && !!token.address);

  // Fetch native token (ETH) balance
  const {
    data: ethBalanceData,
    isError: isEthBalanceError,
    isPending: isEthBalancePending,
    refetch: refetchEthBalance
  } = useBalance({
    address,
    query: {
      enabled: isConnected && enabled && nativeTokens.length > 0,
      refetchInterval: refreshInterval,
    }
  });

  // Fetch ERC20 token balances
  const {
    data: erc20BalancesData,
    isError: isErc20BalancesError,
    isPending: isErc20BalancesPending,
    refetch: refetchErc20Balances
  } = useReadContracts({
    contracts: erc20Tokens.map((token) => ({
      address: token.address as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    })),
    query: {
      enabled: isConnected && enabled && erc20Tokens.length > 0 && !!address,
      refetchInterval: refreshInterval,
    }
  });

  // Manual refresh function
  const refreshBalances = useCallback(() => {
    if (nativeTokens.length > 0) {
      refetchEthBalance();
    }
    if (erc20Tokens.length > 0 && address) {
      refetchErc20Balances();
    }
  }, [refetchEthBalance, refetchErc20Balances, nativeTokens.length, erc20Tokens.length, address]);

  // Process balances when data is available
  useEffect(() => {
    if (!isConnected || !address) {
      setBalances([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newBalances: TokenContribution[] = [];

      // Process ETH balance if available
      if (ethBalanceData && nativeTokens.length > 0) {
        const nativeToken = nativeTokens[0]; // Typically just ETH
        newBalances.push({
          token: nativeToken,
          amount: parseFloat(ethBalanceData.formatted),
        });
      }

      // Process ERC20 token balances
      if (erc20BalancesData && erc20Tokens.length > 0) {
        erc20BalancesData.forEach((result, index) => {
          if (result.status === 'success' && result.result && index < erc20Tokens.length) {
            const token = erc20Tokens[index];
            const rawBalance = result.result;
            if (rawBalance) {
              const decimals = token.decimals || 18;
              const formattedBalance = formatUnits(BigInt(rawBalance.toString()), decimals);
              const amount = parseFloat(formattedBalance);

              if (amount > 0) {
                newBalances.push({
                  token,
                  amount,
                });
              }
            }
          }
        });
      }

      setBalances(newBalances);
    } catch (err) {
      console.error('Error processing token balances:', err);
      setError(err instanceof Error ? err : new Error('Failed to process token balances'));
    } finally {
      setIsLoading(false);
    }
  }, [
    isConnected,
    address,
    ethBalanceData,
    erc20BalancesData,
    nativeTokens,
    erc20Tokens,
  ]);

  // Set error state if any error occurs
  useEffect(() => {
    if (isEthBalanceError || isErc20BalancesError) {
      setError(new Error('Failed to fetch token balances'));
    }
  }, [isEthBalanceError, isErc20BalancesError]);

  return {
    balances,
    isLoading: isLoading || isEthBalancePending || isErc20BalancesPending,
    error,
    refresh: refreshBalances,
  };
}
