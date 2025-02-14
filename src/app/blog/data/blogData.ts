export interface BlogPost {
    id: string;
    title: string;
    category: string;
    author: {
        name: string;
        avatar: string;
    };
    sections: {
        title: string;
        content: string[];
        bullets?: string[];
        image?: {
            src: string;
            alt: string;
        };
    }[];
    disclaimer: {
        footer: string;
        disclosures: string[];
    };
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Crypto Mega Theses',
        category: 'FEATURED',
        author: {
            name: 'Kyle Samani',
            avatar: '/images/test3.jpg'
        },
        sections: [
            {
                title: 'Introduction',
                content: [
                    "Open, distributed ledgers and permissionless, censorship-resistant, trust-minimized computation are going to reshape massive sectors of the global economy. This belief led us to found Forbes Capital in 2017, and after spending two years with entrepreneurs, business leaders, and investors in this space, we've developed more conviction in this thesis than ever before.",
                    "Over the last few years, the breadth of use cases within the crypto ecosystem has exploded. Given this breadth, it can be difficult to define the underlying macro theses when use cases span non-seizable assets, censorship-resistant prediction markets, peer-to-peer wireless networks, new online advertising systems, and jurisdiction-less enterprises.",
                    "The purpose of this essay is to define and articulate the three mega investment theses for crypto. We define mega investment theses as those in which the addressable market is measured in the trillions of 2019 USD.",
                    "We expect these theses to play out over a decade or longer and to generate the vast majority of our returns. In the rough order that we expect them to develop:"
                ],
                bullets: [
                    "Open finance. By making units of value—stocks, bonds, real estate, currencies, etc.—interoperable, programmable, and composable on open ledgers, capital markets will become more accessible and efficient...",
                    "Web3. The Web3 vision is about empowering consumers to control their own data...",
                    "Global, state-free money. In simple terms, one can think of this as digital gold..."
                ]
            },
            {
                title: 'Preface: Trust',
                content: [
                    "The common theme underlying these theses is reducing trust between transacting parties. The modern economy is built on compounding layers of trust. We trust tech giants, banks, insurance companies, the government, and more every minute of every day.",
                    "We trust so many institutions that we take for granted just how many layers of trust the economy is built on. When we're born and raised with certain trust assumptions, we don't even recognize them as assumptions anymore. Given global complexity, detecting abuses of trust is more difficult than ever before.",
                    "For the first time in human history, using open networks bound by cryptography and free-market economics, we can incentivize specific human behaviors without creating new trust assumptions. This is a subtle but profound shift."
                ]
            },
            {
                title: 'Thesis: Open Finance',
                content: [
                    "The Open Finance thesis is sometimes referred to as decentralized finance, or DeFi. However, we prefer the term Open Finance, as the level of (de)centralization is not the basis of the investment thesis. Decentralization is simply a means to open finance.",
                    "Trust is the foundation on top of which all financial services are built.",
                    "Although large and mature capital markets are generally efficient today, they are still nowhere close to being universally accessible. This is true both in developed markets and in developing economies.",
                    "The key innovation enabling open finance is the modularization of financial primitives. By modularizing financial primitives, the open finance stack commoditizes trust such that no application has a unique trust advantage over any other.",
                    "Modularizing financial primitives is an abstract concept. What exactly does it mean to modularize financial primitives?",
                    "Over the last 24 months, a number of open finance protocols have launched. All of these protocols are modular, and are being used by higher-level applications (and often combined). None of these protocols market to end-customers, provide customer service, or deal with local laws. These protocols are just pieces of code that live on blockchains. This is comparable to how email is built on a suite of open protocols like SMTP, TCP/IP, and HTML/JS to render email in the browser.",
                    "For example, let's consider BlitzPredict (BP). BP is an exchange focused on sports betting built on top of the Augur, 0x, and (in the near future) Maker protocols. BP relies on the Augur protocol as a means to create different kinds of markets, create shares in those outcomes, and ultimately resolve markets. BP relies on the 0x protocol to trade shares between users. And BP will soon rely on the Maker protocol for its collateralized stablecoin, DAI, to denominate trades. Each of these protocols function independently. Because they are modular, a higher-level application like BP can combine the underlying financial primitives to produce a trust-minimized user experience that was never before possible.",
                    "Just as the cloud commoditized server deployments, enabling a step-function improvement in the rate of innovation in large-scale web applications, modularizing financial primitives will enable a step-function improvement in the rate of innovation in all financial services.",
                    "Because Open Finance is…open, anyone will be able to build local businesses on top of open finance protocols. This is how open finance will enable the un- and under-banked to access financial services. Protocols will not serve consumers. Businesses that navigate local regulations, and provide localized customer service, will serve consumers instead."
                ],
                image: {
                    src: "/images/Zynga.png",
                    alt: "Open Finance Diagram"
                }
            },
            {
                title: 'Thesis: Web3',
                content: [
                    "Analogous to how Open Finance is predicated on the modularization of financial primitives, Web3 is based on unbundling of data ownership and application logic.",
                    "The high-level architectural differences between Web2 and Web3 are clear: In the Web2 model, companies control closed databases and own—both technically and legally—user data. In the Web3 model, users own their own encrypted data on architecturally open networks.",
                    "The paradigmatic shift in Web3 is the unbundling of data and application logic. By unbundling what was previously bundled, data owners won't need to trust application providers with their data.",
                    "Chris Dixon of a16z Crypto laid out the Web3 thesis in Why Decentralization Matters. Dixon argues that centralized platforms like Google and Facebook, because of their fiduciary obligations to shareholders, inherently transition from providing value to extracting value from their respective ecosystems."
                ],
                image: {
                    src: "/images/cooperate_compete.png",
                    alt: "Web2 vs Web3 Comparison"
                }
            },
            {
                title: 'Global State-Free Money',
                content: [
                    "Because fiat money is bound by trust in human institutions rather than physics, we have to place immense trust in the human institutions that govern money.",
                    "There is a massive opportunity for a trust-minimized money. A natively digital, bearer asset bound by physics, math, and free-market economics rather than human institutions.",
                    "The simplest way to think about the opportunity for a global, state-free money is digital gold. While this framing is not wrong, it dramatically understates the opportunity."
                ],
                image: {
                    src: "/images/global_state_free_money.png",
                    alt: "Global State Free Money Diagram"
                }
            },
            {
                title: 'Conclusion',
                content: [
                    "The economy is a beautifully complex machine. That it works at such incredible scale is a testament to the power of trust that underlies our human institutions.",
                    "While the economy and society are based on an immense amount of trust, trust is not perfect. Humans fail. And therefore human institutions fail. Failures can compound, creating cascading failures and systemic risk.",
                    "The transition from a trust-based economy to one of self-sovereignty will be behind one of the largest wealth transfers in human history.",
                    "Trust is the foundation of all economic relationships. The greatest investment opportunity of our lifetimes is betting that it doesn't have to be."
                ]
            }
        ],
        disclaimer: {
            footer: "Forbes Capital's investment thesis, the 'Crypto Mega Theses,' was first presented at the Spring 2019 Forbes Capital Summit.",
            disclosures: [
                "Disclosure: Unless otherwise indicated, the views expressed in this post are solely those of the author(s) in their individual capacity and are not the views of Forbes Capital Capital Management, LLC or its affiliates (together with its affiliates, 'Forbes Capital'). Certain information contained herein may have been obtained from third-party sources, including from portfolio companies of funds managed by Forbes Capital. Forbes Capital believes that the information provided is reliable but has not independently verified the non-material information and makes no representations about the enduring accuracy of the information or its appropriateness for a given situation.",
                "The content is provided for informational purposes only, and should not be relied upon as the basis for an investment decision, and is not, and should not be assumed to be, complete. The contents herein are not to be construed as legal, business, or tax advice. You should consult your own advisors for those matters.",
                "Past performance does not guarantee future results. There can be no guarantee that any Forbes Capital investment vehicle's investment objectives will be achieved, and the investment results may vary substantially from year to year or even from month to month. As a result, an investor could lose all or a substantial amount of its investment.",
                "Forbes Capital has established, maintains and enforces written policies and procedures reasonably designed to identify and effectively manage conflicts of interest related to its investment activities. For more important disclosures, please see the Disclosures and Terms of Use available at https://forbespartners.org/main/disclosures and https://forbespartners.org/main/terms."
            ]
        }
    }
];
