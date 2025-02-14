import { motion } from 'framer-motion';
import Image from 'next/image';

interface ContentSectionProps {
    title: string;
    content: string[];
    image?: {
        src: string;
        alt: string;
    };
}

export default function ContentSection({ title, content, image }: ContentSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 dm-serif-text-regular">
                {title}
            </h2>

            {content.map((paragraph, index) => (
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
            ))}

            {image && (
                <div className="my-6 p-10">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={400}
                        className="mx-auto max-w-full h-auto"
                    />
                </div>
            )}
        </motion.section>
    );
}
