export interface WorkItem {
  index: string;
  role: string;
  company: string;
  period: string;
  bio: string;
  responsibilities: string[];
  tags: string[];
}

export const workItems: WorkItem[] = [
  {
    index: "01",
    role: "Lead Technical QA Engineer",
    company: "Quadrivia",
    period: "May 2025 – Present",
    bio: "",
    responsibilities: [
      "Sole QA engineer — owned E2E platform testing and all release management across 8 microservices and 3 production environments.",
      "Built a 5-wave, 13-intent agentic smoke test pipeline reducing full regression from 2 hours to 20 minutes.",
      "Built parallel multi-agent investigation teams compressing average bug triage per report from 30–45 minutes to under 2 minutes.",
    ],
    tags: ["Python", "GCP/GKE", "Claude Code", "LiveKit", "Intent-Based Testing", "Domain-Driven Design", "MD as Software", "pytest"],
  },
  {
    index: "02",
    role: "CTO",
    company: "AltStream",
    period: "Sep 2024 – May 2025",
    bio: "",
    responsibilities: [
      "Built an automated AI-powered sports commentary platform generating podcasts from upcoming and previous game data.",
      "Designed three distinct content perspectives: analytical, gambling, and situational.",
      "Leveraged LLMs, Azure Cloud, and Python to architect and ship the full pipeline end-to-end.",
    ],
    tags: ["Python", "Azure", "LLMs", "AI/ML"],
  },
  {
    index: "03",
    role: "Software Developer",
    company: "Top Hat Security",
    period: "Nov 2023 – Aug 2024",
    bio: "",
    responsibilities: [
      "Developed Python scripts using proxy modules to automate data aggregation for ML models.",
      "Facilitated analysis of 1.4 million semiconductor chips for building ML and NLP models for ICBs.",
      "Automated product metadata storage and maintenance using Python and proprietary API calls via SQL DBs.",
    ],
    tags: ["Python", "ML/NLP", "SQL", "Pandas"],
  },
  {
    index: "04",
    role: "Software Developer",
    company: "Covestone × Jobnet",
    period: "May 2020 – Oct 2022",
    bio: "",
    responsibilities: [
      "Developed 20+ Python programs to create the company's foundational database of over one million products.",
      "Facilitated the launch of a customer-facing e-commerce site for our largest client.",
      "Developed secure file transfer and validation integration using GO and C++.",
    ],
    tags: ["Python", "GO", "C++", "EDI"],
  },
  {
    index: "05",
    role: "Lead Lab Technician",
    company: "Enabling Engineering · NEU",
    period: "Jun 2018 – May 2020",
    bio: "",
    responsibilities: [
      "Supported 23 teams of roughly 100 students in prototyping hardware and products for the mentally and physically disabled.",
      "Led teams in improving hardware prototypes using OnShape and Simplify3D.",
      "Taught 3D printing and product design at the Carter School to students with cognitive delay.",
    ],
    tags: ["Onshape", "Simplify3D", "Product Design"],
  },
  {
    index: "06",
    role: "Inventor",
    company: "Hippo Zipper Clip",
    period: "Jan 2018 – Present",
    bio: "",
    responsibilities: [
      "Designed an assistive apparel device enabling one-handed zipping for people with hemiparesis.",
      "Led a hackathon team from concept through fabrication and patent filing.",
    ],
    tags: ["Hardware", "AutoCAD", "Onshape", "Assistive Tech", "Patent #10448769"],
  },
];
