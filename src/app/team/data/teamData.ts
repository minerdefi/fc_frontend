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
    },
    
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


