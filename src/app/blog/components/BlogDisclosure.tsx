import { motion } from 'framer-motion';

export default function BlogDisclosure() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8"
        >
            <div className="prose prose-gray dark:prose-invert max-w-none text-sm space-y-4">
                <p className="titillium-web-extralight-italic">
                    <b className="titillium-web-semibold">Disclosure:</b> Unless otherwise indicated, the views expressed in this post are solely those of the author(s) in their individual capacity and are not the views of Forbes Capital Capital Management, LLC or its affiliates (together with its affiliates, &quot;Forbes Capital&quot;).
                </p>
                <p className="titillium-web-extralight-italic">
                    A list of investments made by funds managed by Forbes Capital is available here: {' '}
                    <a href="https://forbespartners.org/main/portfolio/" target="_blank" rel="noopener noreferrer" className="text-[#308e87] hover:underline">
                        https://forbespartners.org/main/portfolio/
                    </a>
                </p>
                <p className="text-sm text-gray-500">
                    {`Please be aware that investing in financial instruments, including digital assets like cryptocurrencies, involves substantial risk. Past performance doesn&apos;t guarantee future results.`}
                </p>
            </div>
        </motion.div>
    );
}
