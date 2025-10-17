export const getApiUrl = (endpoint: string): string => {
    // Always use direct API calls (Vercel doesn't support external URL rewrites)
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
