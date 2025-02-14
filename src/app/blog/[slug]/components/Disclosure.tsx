export default function Disclosure() {
    return (
        <>
            <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />
            <div className="sm:text-sm md:text-sm lg:text-sm">
                <p className="mb-2 titillium-web-extralight-italic">
                    <b className="titillium-web-semibold">Disclosure:</b> Unless otherwise indicated, the views expressed in this post are solely those of the author(s) in their individual capacity and are not the views of Forbes Capital Capital Management, LLC or its affiliates (together with its affiliates, &quot;Forbes Capital&quot;).
                </p>
                <p className="mb-2 titillium-web-extralight-italic">
                    The content is provided for informational purposes only, and should not be relied upon as the basis for an investment decision... {/* Rest of disclosure text */}
                </p>
                <p className="mb-2 titillium-web-extralight-italic">
                    A list of investments made by funds managed by Forbes Capital is available here: <span className="text-[#308e87] hover:underline cursor-pointer">https://forbespartners.org/main/portfolio/</span>
                </p>
                {/* Use proper JSX comments */}
                <p className="text-sm text-gray-500">
                    {`Please be aware that investing in financial instruments carries risk.`}
                </p>
            </div>
        </>
    );
}
