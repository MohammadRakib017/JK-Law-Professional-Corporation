export interface PracticeArea {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  keyMatters: string[];
  guidanceNote: string;
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "family-law",
    name: "Family Law",
    shortDesc: "Compassionate counsel and decisive advocacy for divorce, separation agreements, parenting arrangements, and asset division.",
    longDesc: "Navigating family disputes requires both legal acumen and empathy. At JK Law, we prioritize constructive resolutions that safeguard the emotional and financial well-being of you and your children, while vigorously protecting your legal rights.",
    iconName: "HeartHandshake",
    keyMatters: [
      "Divorce & Legal Separation",
      "Child Custody & Parenting Time",
      "Child & Spousal Support Calculation",
      "Division of Matrimonial Property",
      "Cohabitation & Marriage Contracts",
    ],
    guidanceNote: "We focus on negotiation and mediation first to reduce emotional stress and unnecessary costs, while remaining fully prepared for court litigation.",
  },
  {
    id: "criminal-law",
    name: "Criminal Law",
    shortDesc: "Vigorous defence safeguarding your rights, liberty, and future against provincial and federal charges in Ontario courts.",
    longDesc: "Facing criminal charges carries life-altering consequences. Our defence approach focuses on meticulous evidence scrutiny, constitutional Charter protections, bail hearings, and aggressive trial advocacy.",
    iconName: "ShieldAlert",
    keyMatters: [
      "Summary & Indictable Offences",
      "Impaired Driving / DUI Charges",
      "Assault & Domestic Allegations",
      "Bail Hearings & Reviews",
      "Charter Rights Violations & Evidence Exclusion",
    ],
    guidanceNote: "Early legal intervention is critical. Do not provide statements to law enforcement without speaking to our defence counsel.",
  },
  {
    id: "civil-litigation",
    name: "Civil Litigation",
    shortDesc: "Strategic dispute resolution for commercial conflicts, contractual disagreements, property disputes, and tort claims.",
    longDesc: "Civil disputes demand rigorous legal analysis and cost-benefit pragmatism. We represent individuals and corporations in Ontario Superior Court and Small Claims Court with tactical precision.",
    iconName: "Scale",
    keyMatters: [
      "Breach of Contract & Commercial Disputes",
      "Property & Boundary Disagreements",
      "Debt Recovery & Enforcement of Judgments",
      "Shareholder & Partnership Conflicts",
      "Injunctions & Emergency Relief",
    ],
    guidanceNote: "We analyze liability, exposure, and recovery feasibility early to structure a decisive, economical litigation strategy.",
  },
  {
    id: "personal-injury",
    name: "Personal Injury",
    shortDesc: "Dedicated advocacy to secure fair compensation for physical, emotional, and financial rehabilitation following accidents.",
    longDesc: "If you have suffered harm due to another party's negligence, insurance companies will move swiftly to minimize their liability. We level the playing field, securing maximum recovery for medical expenses, lost wages, and pain.",
    iconName: "Activity",
    keyMatters: [
      "Motor Vehicle & Pedestrian Accidents",
      "Slip & Fall Incidents (Occupiers' Liability)",
      "Statutory Accident Benefits (SABS)",
      "Catastrophic Injury & Long-term Disability",
      "Insurance Claim Denials & Bad Faith",
    ],
    guidanceNote: "Statutory limitation periods in Ontario are strict. Contact us promptly to ensure crucial evidence is preserved.",
  },
  {
    id: "real-estate-law",
    name: "Real Estate Law",
    shortDesc: "Meticulous legal guidance for residential and commercial purchases, sales, refinances, and title investigations in York Region.",
    longDesc: "Real estate transactions represent major financial milestones. Our team provides comprehensive title examination, mortgage financing review, closing coordination, and dispute resolution for smooth, secure closings.",
    iconName: "Home",
    keyMatters: [
      "Residential Purchases & Sales",
      "Commercial Property Acquisitions",
      "Mortgage Refinancing & Private Lending",
      "Title Searches & Title Insurance Review",
      "Drafting & Reviewing Commercial Leases",
    ],
    guidanceNote: "We perform thorough due diligence to detect title encumbrances, easements, or hidden liens prior to closing.",
  },
  {
    id: "business-law",
    name: "Business Law",
    shortDesc: "Foundational and transactional counsel for startups, expanding enterprises, and established Canadian corporations.",
    longDesc: "From incorporation and corporate structuring to complex commercial agreements and mergers, we protect business interests with proactive, risk-mitigating legal strategies tailored to your commercial objectives.",
    iconName: "Briefcase",
    keyMatters: [
      "Federal & Ontario Incorporations",
      "Shareholder & Partnership Agreements",
      "Commercial Contract Drafting & Review",
      "Purchase & Sale of Business Assets / Shares",
      "Corporate Governance & Annual Compliance",
    ],
    guidanceNote: "A well-structured corporate foundation prevents costly shareholder disputes and clarifies long-term governance.",
  },
  {
    id: "immigration-law",
    name: "Immigration Law",
    shortDesc: "Comprehensive immigration solutions for permanent residency, work permits, spousal sponsorships, and appeals.",
    longDesc: "Canadian immigration law evolves rapidly with shifting ministerial instructions. We assist individuals, families, and employers in navigating IRCC policies with precision to maximize approval prospects.",
    iconName: "Globe2",
    keyMatters: [
      "Express Entry & Provincial Nominee Programs (OINP)",
      "Spousal & Family Sponsorship Applications",
      "LMIA & Employer-Supported Work Permits",
      "Study Permits & Post-Graduation Work Permits",
      "Citizenship Applications & Refusal Appeals",
    ],
    guidanceNote: "Application completeness and procedural compliance are paramount. We review all evidence to eliminate processing delays.",
  },
  {
    id: "estate-planning",
    name: "Estate Planning",
    shortDesc: "Thoughtful structuring of wills, powers of attorney, trusts, and probate administration to protect your family's legacy.",
    longDesc: "Effective estate planning provides peace of mind and shields loved ones from unnecessary probate taxes and contentious disputes. We construct robust testamentary instruments tailored to your family dynamics.",
    iconName: "FileCheck",
    keyMatters: [
      "Last Will & Testament Drafting",
      "Powers of Attorney for Personal Care & Property",
      "Family & Testamentary Trusts",
      "Estate Administration & Probate (Certificate of Appointment)",
      "Estate Litigation & Beneficiary Rights",
    ],
    guidanceNote: "Estate planning is not just for later life; it is essential protection whenever you acquire property, marry, or have children.",
  },
  {
    id: "legal-consultation",
    name: "Legal Consultation",
    shortDesc: "In-depth preliminary legal review to assess your rights, evaluate risks, and determine the most effective legal recourse.",
    longDesc: "Unsure where you stand? A structured consultation with our Richmond Hill legal team provides clarity, objective case assessment, and actionable next steps before taking legal action or signing critical documents.",
    iconName: "Users",
    keyMatters: [
      "Pre-Litigation Case Assessment",
      "Document & Agreement Review",
      "Risk Exposure & Cost-Benefit Analysis",
      "Strategy Formulation & Timelines",
      "Second Opinion on Existing Legal Matters",
    ],
    guidanceNote: "Bring all relevant documents to your consultation for a thorough, substantive legal evaluation.",
  },
];

export const FIRM_DETAILS = {
  name: "JK Law Professional Corporation",
  shortName: "JK Law",
  phone: "+1 289-217-7920",
  phoneRaw: "+12892177920",
  email: "reception@jklawfirm.ca",
  address: "10210 Yonge Street, Unit B, Richmond Hill, ON, Canada, Ontario",
  addressShort: "10210 Yonge St, Unit B, Richmond Hill, ON",
  hours: "Monday – Friday: 9:00 AM – 5:30 PM",
  weekendHours: "Evening & Weekend by Appointment",
  facebookUrl: "https://www.facebook.com/JKLawPC/",
  instagramUrl: "https://www.instagram.com/jklawfirm/?hl=en",
  googleMapsUrl: "https://maps.google.com/?q=10210+Yonge+Street+Unit+B+Richmond+Hill+ON",
};
