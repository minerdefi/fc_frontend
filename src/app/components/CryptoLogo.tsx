import Image from 'next/image';

interface CryptoLogoProps {
    symbol: string;
    name: string;
    className?: string;
}

export default function CryptoLogo({ symbol, name, className = "h-8 w-8" }: CryptoLogoProps) {
    return (
        <div className={className}>
            <Image
                src={`/images/${symbol}.svg`}
                alt={`${name} Logo`}
                width={32}
                height={32}
                className="object-contain"
            />
        </div>
    );
}
