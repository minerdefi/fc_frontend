'use client';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
    text?: string;
}

export default function Loader({ size = 'medium', fullScreen = false, text = 'Loading...' }: LoaderProps) {
    const sizeClasses = {
        small: 'w-5 h-5',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    const loaderContent = (
        <div className="flex flex-col items-center justify-center space-y-3">
            <div className={`${sizeClasses[size]} animate-spin`}>
                <div className="h-full w-full border-4 border-gray-200 rounded-full border-t-[#308e87]"></div>
            </div>
            {text && (
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
}
