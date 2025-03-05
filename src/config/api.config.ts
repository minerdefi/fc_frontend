export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://minerdefi.pythonanywhere.com';

export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/auth/login/`,
        register: `${API_BASE_URL}/auth/register/`,
        forgotPassword: `${API_BASE_URL}/auth/forgot-password/`,
        resetPassword: `${API_BASE_URL}/auth/reset-password/`,
        verifyEmail: `${API_BASE_URL}/auth/verify-email/`,
    },
    // ...other endpoints
};

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

export const fetchConfig = {
    credentials: 'include' as RequestCredentials,
    headers: API_CONFIG.headers
};
