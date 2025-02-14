export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    status: string;
    data: {
        user: {
            username: string;
            email: string;
            first_name: string;
            last_name: string;
        };
        tokens: {
            refresh: string;
            access: string;
        };
    };
}

export interface VerificationResponse {
    status: string;
    message: string;
}
