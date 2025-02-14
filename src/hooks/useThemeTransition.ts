import { useEffect } from 'react';

export const useThemeTransition = () => {
    useEffect(() => {
        // Apply theme immediately on component mount
        const theme = localStorage.getItem('forbes-capital-theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);
};
