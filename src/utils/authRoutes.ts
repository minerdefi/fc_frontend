export const isAuthRoute = (pathname: string | null): boolean => {
    const authRoutes = ['/login', '/register', '/verify-email', '/dashboard'];
    return authRoutes.includes(pathname || '');
};
