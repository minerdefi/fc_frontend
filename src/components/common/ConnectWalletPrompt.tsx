'use client';

import React, { ReactNode } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

interface ConnectWalletPromptProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export default function ConnectWalletPrompt({
  title = 'Connect Your Wallet',
  description = 'Please connect your wallet to continue.',
  icon,
  className = '',
}: ConnectWalletPromptProps) {
  const { open } = useWeb3Modal();

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="text-center max-w-md mx-auto">
        {icon || <FontAwesomeIcon icon={faPlug} className="text-4xl text-gray-400 mb-4" />}
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
        
        <button
          onClick={() => open()}
          className="inline-flex items-center px-6 py-3 bg-[#308e87] hover:bg-[#266f69] text-white rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faPlug} className="mr-2" />
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
