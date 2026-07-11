export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export const experience: Experience[] = [
  
  {
    company: "Codex",
    position: "Business Analyst",
    period: "2026 January - 2026 July",
    description: [
      "Analyzed business requirements and translated them into technical solutions",
      "Collaborated with developers to implement business logic and data models",
      "Developed and maintained the company's website and internal tools",
      "Optimized database queries and improved application performance",
      "Participated in daily stand-ups and sprint planning sessions",
    ],
  },
];
