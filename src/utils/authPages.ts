export const isAuthPage = (pathname: string): boolean => {
    const authPages = ['/login', '/register', '/verify-email'];
    return authPages.includes(pathname);
};
