import { motion } from 'framer-motion';

export default function Disclosure() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sm:text-sm md:text-sm lg:text-sm mt-12 p-6 rounded-lg bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
        >
            <p className="mb-2 titillium-web-extralight-italic space-y-4 text-gray-600 dark:text-gray-400">
                <b className="titillium-web-semibold">Disclosure:</b> Any investments or portfolio companies mentioned, referred to, or described on this page are not representative of all investments in vehicles managed by FG Premium Funds and there can be no assurance that the investments will be profitable or that other investments made in the future will have similar characteristics or results.
            </p>
            <p className="mb-2 titillium-web-extralight-italic text-gray-600 dark:text-gray-400">
                Exits include (1) current and former FG Premium Funds portfolio companies which may have been acquired and/or (2) where FG Premium Funds sold tokens and/or equity. Certain portfolio companies on this list may still be held in FG Premium Funds funds.
            </p>
            <p className="mb-2 titillium-web-extralight-italic text-gray-600 dark:text-gray-400">
                A list of investments made by funds managed by FG Premium Funds is available here: <span className="text-[#308e87] hover:underline cursor-pointer">https://fgpremiumfunds.com/main/portfolio/</span>
            </p>
            <p className="mb-2 titillium-web-extralight-italic text-gray-600 dark:text-gray-400">
                Excluded from this list are investments that have not yet been announced (1) for strategic reasons (e.g., undisclosed positions in publicly traded digital assets) or (2) due to coordination with the development team or issuer on the timing and nature of public disclosure.
            </p>
            <p className="mb-2 titillium-web-extralight-italic text-gray-600 dark:text-gray-400">
                Further, the list of investments is updated monthly and, as such, may not reflect the most recent FG Premium Funds investments. Past results of FG Premium Funds's investments, pooled investment vehicles, or investment strategies are not necessarily indicative of future results.
            </p>
        </motion.div>
    );
}
