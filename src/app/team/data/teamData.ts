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
            twitter: "#",
            linkedin: "#",
            github: "#",
            instagram: "#"
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
            twitter: "#",
            linkedin: "#",
            github: "#"
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
            twitter: "#",
            linkedin: "#",
            github: "#"
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
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "William Xethalis",
        title: "Partner, General Counsel",
        image: "https://images.ctfassets.net/qtbqvna1l0yq/3br4X1Ez4jIKeA5jscDJUT/bd374c7934e4b2c4f389778e99f9b0ad/Gregoy_Xethalis_copy.jpeg?w=448&h=446&q=50&fm=webp",  // Updated to local path
        bio: [
            "William Xethalis is General Counsel of FG Premium Management LLC. Joining Forbes in July 2021, William manages all legal and policy functions for the firm and works with our portfolio companies on legal and policy strategy.",
            "Prior to joining FG, William was a partner in the Investment Management and FinTech practices at Chapman and Cutler LLP. with 11 years of experience counseling clients on digital asset matters, with a focus on asset managers, CeFi institutions and stable value tokens. William's practice also involved representation of traditional equity, debt and commodity asset managers, with a specialty in novel registered products. William is a member of the Board of the Fordham Law Alumni Association and Senior Lecturing Fellow at Duke University School of Law, where he teaches Fintech and Blockchain Law and Policy."
        ],
        social: {
            linkedin: "#"
        }
    },
    {
        name: "Michelle Elena Robert",
        title: "Partner, Head of Communications",
        image: "https://forbes-partners.com/wp-content/uploads/2022/04/kelly-fitzgerald-sm.jpg",  // Updated to local path
        bio: [
            "Michelle leads communications and marketing strategy at FG Premium. She brings over a decade of experience in strategic communications, brand development, and digital marketing in the financial services and technology sectors.",
            "Prior to FG Premium, Michelle held senior communications roles at leading crypto and fintech companies, where she helped shape narratives around emerging technologies and financial innovation."
        ],
        social: {
            twitter: "#",
            linkedin: "#"
        }
    }
];


