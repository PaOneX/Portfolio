export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export const experience: Experience[] = [
  {
    company: "Tech Company Inc.",
    position: "Senior Full Stack Developer",
    period: "2022 - Present",
    description: [
      "Led development of enterprise web applications serving 100K+ users",
      "Implemented microservices architecture improving system scalability by 60%",
      "Mentored junior developers and conducted code reviews",
      "Collaborated with cross-functional teams using Agile methodology",
    ],
  },
  {
    company: "Digital Solutions Ltd.",
    position: "Full Stack Developer",
    period: "2020 - 2022",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Optimized application performance resulting in 40% faster load times",
      "Integrated third-party APIs and payment gateways",
      "Participated in daily stand-ups and sprint planning sessions",
    ],
  },
  {
    company: "Startup Ventures",
    position: "Junior Developer",
    period: "2018 - 2020",
    description: [
      "Built responsive user interfaces using modern frameworks",
      "Implemented RESTful APIs and database schemas",
      "Fixed bugs and improved code quality through testing",
      "Contributed to internal tools and automation scripts",
    ],
  },
];
