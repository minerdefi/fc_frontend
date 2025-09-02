export const getApiUrl = (endpoint: string): string => {
    // On the client, use Next.js rewrite proxy to avoid CORS issues
    if (typeof window !== 'undefined') {
        return `/api${endpoint}`;
    }

    // On the server (SSR/build), use the configured base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.fgpremiumfunds.com';
    return `${baseUrl}${endpoint}`;
};

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = getApiUrl(endpoint);
    const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    return fetch(url, defaultOptions);
};
