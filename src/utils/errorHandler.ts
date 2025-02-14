interface ErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
    message?: string;
}

export const handleError = (error: ErrorResponse): string => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.message) {
        return error.message;
    }
    return 'An unexpected error occurred';
};
