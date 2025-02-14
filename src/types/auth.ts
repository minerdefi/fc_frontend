export interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface AuthResponse {
    status: string;
    message?: string;
    data?: {
        user: User;
        tokens?: {
            access: string;
            refresh: string;
        };
    };
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface VerificationResponse {
    status: string;
    message: string;
}

export interface AuthContextType {
    refreshProfile: () => Promise<void>;
}
