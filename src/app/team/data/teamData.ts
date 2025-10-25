export interface TeamMemberType {
    name: string;
    title: string;
    image: string;
    bio: string[];
    social: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        instagram?: string;
        facebook?: string;
        email?: string;
    };
}

export const teamMembers: TeamMemberType[] = [
    {
        name: "Bob Forbes",
        title: "President",
        image: "https://forbes-partners.com/wp-content/uploads/2022/02/bob-forbes-sm.jpg",  // Updated to local path
        bio: [
            "Bob Forbes is the president and founder of Forbes Partners. He is based in the firm's Denver, Colorado office.",
            "Since beginning his career in 1991, Bob has led more than 150 corporate finance initiatives as a business owner, private equity executive, and investment banker. His experience includes M&A, debt and equity financings, and corporate restructurings in a wide range of industries including technology, consumer products, food, healthcare, entertainment, energy, industrials, and business services."
        ],
        social: {
           email: "mailto:bobforbes@fgpremiumfunds.com"
        }
    },
    {
        name: "Jacob Samani",
        title: "Managing Partner",
        image: "https://images.ctfassets.net/qtbqvna1l0yq/4OF6ywwNnbQLmD5qsIQ9kF/29aa033b59f51bc65fff3729e6948fe4/kyle_samani__2_.jpg?w=700&h=700&q=50&fm=webp",  // Updated to local path
        bio: [
            "As a former engineer, Jacob leads technical thesis formation and diligence. He is the more outward-facing partner, owning relationships with entrepreneurs and other investors. He is widely recognized in the crypto ecosystem for his writing and system-level analysis.",
            "Jacob previously founded Pristine, a health IT startup that raised more than $5M in VC, and which was acquired by Upskill. Jacob holds degrees in Finance and Management from NYU."
        ],
        social: {
            email: "mailto:jacob@fgpremiumfunds.com"
        }
    },
    {
        name: "Bill Jain",
        title: "Managing Director + Partner",
        image: "https://forbes-partners.com/wp-content/uploads/2022/02/bill-nack-sm.jpg",  // Updated to local path
        bio: [
            "Bill leads our portfolio construction, risk management, and manages the team. He is passionate about the new economic paradigm enabled by blockchain technology and focuses on decentralized financial products, token economics, and blockchain go-to-market strategies.",
            "Bill previously founded ePatientFinder, a health IT tech startup that raised more than $10M in VC, and which was acquired by Elligo Health Research. Bill holds degrees in Finance and Political Science from NYU."
        ],
        social: {
            email: "mailto:billjain@fgpremiumfunds.com"
        }
    },
    {
        name: "Alex Shapiro",
        title: "Partner, Head of Investor Relations, and Member of the Investment Team",
        image: "https://forbes-partners.com/wp-content/uploads/2022/02/james-morgan-sm.jpg",  // Updated to local path
        bio: [
            "Alex leads investor relations and manages relationships with our partners. He also specializes in structured investments.",
            "Alex has 15 years of investment banking experience structuring nine and ten-figure financings, spin outs, mergers, and acquisitions."
        ],
        social: {
            email: "mailto:alexshapiro@fgpremiumfunds.com"
        }
    },
    {
        name: "William Xethalis",
        title: "Partner, General Counsel",
        image: "https://images.ctfassets.net/qtbqvna1l0yq/3br4X1Ez4jIKeA5jscDJUT/bd374c7934e4b2c4f389778e99f9b0ad/Gregoy_Xethalis_copy.jpeg?w=448&h=446&q=50&fm=webp",  // Updated to local path
        bio: [
            "William Xethalis is General Counsel of FG Premium Funds Management LLC. Joining Forbes in July 2021, William manages all legal and policy functions for the firm and works with our portfolio companies on legal and policy strategy.",
            "William Xethalis is General Counsel of FG Premium Management LLC. Joining Forbes in July 2021, William manages all legal and policy functions for the firm and works with our portfolio companies on legal and policy strategy.",
            "Prior to joining FG, William was a partner in the Investment Management and FinTech practices at Chapman and Cutler LLP. with 11 years of experience counseling clients on digital asset matters, with a focus on asset managers, CeFi institutions and stable value tokens. William's practice also involved representation of traditional equity, debt and commodity asset managers, with a specialty in novel registered products. William is a member of the Board of the Fordham Law Alumni Association and Senior Lecturing Fellow at Duke University School of Law, where he teaches Fintech and Blockchain Law and Policy."
        ],
        social: {},
    },
    {
        name: "Michelle Fitzgerald",
        title: "Partner, Head of Communications",
        image: "https://forbes-partners.com/wp-content/uploads/2022/04/kelly-fitzgerald-sm.jpg",  // Updated to local path
        bio: [
            "Michelle leads communications and marketing strategy at FG Premium Funds. She brings over a decade of experience in strategic communications, brand development, and digital marketing in the financial services and technology sectors.",
            "Prior to FG Premium Funds, Michelle held senior communications roles at leading crypto and fintech companies, where she helped shape narratives around emerging technologies and financial innovation.",
            "Michelle leads communications and marketing strategy at FG Premium. She brings over a decade of experience in strategic communications, brand development, and digital marketing in the financial services and technology sectors.",
            "Prior to FG Premium, Michelle held senior communications roles at leading crypto and fintech companies, where she helped shape narratives around emerging technologies and financial innovation."
        ],
        social: {
            email: "mailto:michellefitzgerald@fgpremiumfunds.com"
        }
    },
    {
        name: "Rich Wooditch",
        title: "Managing Director, Forbes & Green",
        image: "/images/rw.jpeg",  // Updated to local path
        bio: [
            "Richard (‘Rich’) Wooditch is the Managing Director of Forbes and Green, and a special advisor to Forbes & Green's multi-strategy funds. He also serves on the Forbes and Green Executive Committee and the Green Investment Committee. Previously, Rich was director of research at Green Trading LLC, responsible for research initiatives, including the day-to-day management of Green Trading’s strategic alpha research team. Before becoming director of research, he was a portfolio manager for various hedge fund strategies as well as being co-head of his hedge fund group, having joined in 2018. Rich holds a Bachelor degree in economics and in Computer Science from Yale University and a Master of Business Administration degree from Harvard Business School",
           
        ],
        social: {
           linkedin: "https://www.linkedin.com/in/richard-guillaume-8a22681a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
           email: "mailto:richardwooditch@fgpremiumfunds.com",
        }
    },
    {
        name: "Rebecca Watson",
        title: "Director of Investor Relations",
        image: "/images/rwn.jpeg",  // Updated to local path
        bio: [
            "Rebecca Watson is the Director of Investor Relations at Forbes and Green Capital. Previously she was the Director of Investor Relations at Handelsbanken Stockholm and Forbes Capital, a blockchain investment firm based in Malta with over 900mm in clientele under direct management. Prior to that, Rebecca managed the London prime brokerage and capital introduction business for Handelsbanken and was part of HSBC capital markets sales and trading team. She holds a bachelor's degree in General Finance from The KTH Royal and a masters degree in economics. Previously held FINRA Series 7 and Series 63 licenses and other top blockchain licenses. Rebecca volunteers for Help For Children"
        ],
        social: {
            email: "mailto:rebeccawatson@fgpremiumfunds.com",
        }
    },
    {
        name: "ONG Yoshiaki Fukuda",
        title: "Research Director",
        image: "/images/ong.jpeg",  // Updated to local path
        bio: [
            "Yoshiaki is a registered financial professional with Forbes & Green LLC and started his career in finance in 1987. Yoshiaki had worked at 3 Security firms across Japan and USA and is a holder of the Series 27"
        ],
        social: {
            email: "mailto:ongyoshiakifukuda@fgpremiumfunds.com",
        }
    },
    
    {
        name: "Anzhelika Sklarz",
        title: "Analyst, Responsible Investment",
        image: "/images/anz.jpeg",  // Updated to local path
        bio: [
            "Anzhelika Sklarz is on the team of advisors at Forbes & Green LLC. Anzhelika Sklarz has been working for 23 year(s) with over 20 years spent with her previous employer Morgan Stanley. Anzhelika has previously passed the Series 63 and Series 66 examinations, and is registered to provide investment advice. Joined Forbes & Green in 2022 having gained experience in responsible investment while working with the Morgan Stanley team, she has specialized in this area since 2009. She has completed the PRI Academy Responsible Investment Essentials and Enhanced Financial Analysis courses and is a CFA charter-holder"
        ],
        social: {
            facebook: "https://www.facebook.com/share/17FocBBahE/?mibextid=wwXIfr",
            email: "mailto:anzhelikasklarz@fgpremiumfunds.com"
        }
    },
    {
        name: "Jan Wojick",
        title: "Lead Investment Analyst",
        image: "/images/jw.jpeg",  // Updated to local path
        bio: [
            "Jan Wojick joined Forbes and green in 2022 as an investment analyst, focusing on building out our portfolio of companies and protocols spanning DeFi, Web3 infrastructure, developer tooling, and more. Prior to Forbes and green, jan worked in long/short public equities growth investing at Alger as a generalist covering crypto. He has Masters degrees in Mathematical Finance from London school of economics and in Mechanical Engineering from university of London"
        ],
        social: {
             email: "mailto:janwojick@fgpremiumfunds.com"
       
        }
    }
];

export const strategicAdvisors: TeamMemberType[] = [
    {
        name: "Victoria S. Nolan",
        title: "Chief Risk Officer",
        image: "",  // No image
        bio: [
            "With over 22 years in risk management, Victoria is a respected authority in quant-based risk strategies and regulatory compliance. She spearheads initiatives that improve risk-adjusted returns for institutional clients. Her expertise in managing downside risk is pivotal in Forbes and Green's commitment to safeguarding client assets. Victoria holds an MS in Financial Mathematics from NYU."
        ],
        social: {}
    },
    {
        name: "Olivia J. Kemp",
        title: "Head of Quant Department",
        image: "",  // No image
        bio: [
            "With a background in both academic and applied finance, Olivia has spent the last 20 years focusing on quantitative research and data-driven investment approaches. Previously, she was Director of Research, where she developed proprietary models that enhanced portfolio performance. Olivia holds a Ph.D. in Econometrics from MIT and has published extensively in leading financial journals."
        ],
        social: {}
    },
    {
        name: "Robert B. Preston",
        title: "Secondary Portfolio Manager",
        image: "",  // No image
        bio: [
            "Robert is a Portfolio Manager with 17 years of experience in alternative investments, including hedge funds, private equity, and structured products. He previously managed a $5 billion alternatives portfolio at his Previous Firm, consistently achieving superior risk-adjusted returns. Robert holds an MBA from Columbia Business School and is a Chartered Alternative Investment Analyst (CAIA)."
        ],
        social: {}
    },
    {
        name: "Christine A. Lloyd",
        title: "Chief Compliance Officer",
        image: "",  // No image
        bio: [
            "Christine has over 20 years of regulatory compliance experience in the investment management industry. She ensures adherence to SEC regulations while fostering a culture of transparency and accountability. Christine's deep knowledge of regulatory frameworks is essential in maintaining Forbes and Green's operational integrity. She holds a JD from Georgetown University."
        ],
        social: {}
    }
];


