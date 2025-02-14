import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlogSectionProps {
    title: string;
    content: string[];
    image?: {
        src: string;
        alt: string;
    };
}

export default function BlogSection({ title, content, image }: BlogSectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {title}
            </h2>

            {content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                </p>
            ))}

            {image && (
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>
            )}
        </motion.section>
    );
}
