'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error boundary specifically for wallet connection code
 * This prevents wallet connection errors from crashing the entire app
 */
class WalletErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Wallet connection error:", error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback || (
                <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 my-4">
                    <div className="flex items-start">
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className="text-red-600 dark:text-red-400 mt-0.5 mr-3"
                        />
                        <div>
                            <h3 className="text-red-800 dark:text-red-200 font-medium">
                                Wallet Connection Error
                            </h3>
                            <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                                {this.state.error?.message || "There was a problem connecting to your wallet"}
                            </p>
                            <div className="mt-3">
                                <button
                                    onClick={this.resetError}
                                    className="text-xs px-3 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default WalletErrorBoundary;
