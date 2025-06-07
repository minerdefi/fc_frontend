'use client';

import { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChevronDown, faCheckCircle, faPowerOff, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function ConnectButton() {
  const { open, close } = useWeb3Modal();
  const { address, isConnected, isConnecting, isReconnecting, status } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { chains, switchChain, isPending: isSwitchPending } = useSwitchChain();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fix for hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset error when connection state changes
  useEffect(() => {
    if (isConnected) {
      setError(null);
    }
  }, [isConnected]);

  // Handle wallet modal opening with error handling
  const handleOpenModal = async () => {
    try {
      setIsModalOpen(true);
      setError(null);
      await open();
    } catch (error) {
      console.error('Failed to open wallet modal:', error);
      setError('Failed to open wallet connection modal. Please try again.');
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle manual disconnect with error handling
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      setError('Failed to disconnect wallet. Please try again.');
    }
  };

  if (!mounted) return null;

  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Get chain name
  const getChainName = () => {
    const chain = chains.find(c => c.id === chainId);
    return chain?.name || 'Unknown';
  };

  // Handle network switching
  const handleNetworkSwitch = (newChainId: number) => {
    if (switchChain) {
      try {
        switchChain({ chainId: newChainId });
        setIsDropdownOpen(false);
      } catch (error) {
        console.error('Failed to switch network:', error);
        setError(`Failed to switch to ${chains.find(c => c.id === newChainId)?.name || newChainId}`);
      }
    }
  };

  const getConnectionStatusClass = () => {
    if (error) return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300';
    if (isConnected) return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    return 'bg-[#308e87] hover:bg-[#266f69] text-white';
  };

  return (
    <div className="relative">
      {isConnected && address ? (
        // Connected state
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 py-2 px-4 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400" />
            <span className="font-medium">{formatAddress(address)}</span>
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">Connected as</div>
                <div className="font-medium text-gray-700 dark:text-gray-300 break-all">
                  {address}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Network: {getChainName()}
                </div>
              </div>

              <div className="p-1">
                {chains.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleNetworkSwitch(c.id)}
                    disabled={chainId === c.id || isSwitchPending}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${chainId === c.id
                      ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    {isSwitchPending ? (
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    ) : null}
                    Switch to {c.name}
                  </button>
                ))}
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full text-left p-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center"
              >
                <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        // Not connected state
        <div>
          <button
            onClick={handleOpenModal}
            disabled={isConnecting || isModalOpen || isReconnecting}
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${getConnectionStatusClass()}`}
          >
            {isConnecting || isModalOpen || isReconnecting ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : error ? (
              <FontAwesomeIcon icon={faExclamationTriangle} />
            ) : (
              <FontAwesomeIcon icon={faWallet} />
            )}
            <span>
              {isConnecting || isReconnecting ? 'Connecting...' :
                isModalOpen ? 'Opening...' :
                  error ? 'Connection Error' : 'Connect Wallet'}
            </span>
          </button>

          {error && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
