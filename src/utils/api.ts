export const getApiUrl = (endpoint: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fgpremium.pythonanywhere.com';
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
