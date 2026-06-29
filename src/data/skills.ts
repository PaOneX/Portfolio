export interface SkillGroup {
  category: string;
  items: string[];
}

export const allSkills = [
  "Angular",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "GraphQL",
  "Firebase",
  "Next.js",
  "Express",
  "Django",
] as const;

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
  },
  {
    category: "Tools & Others",
    items: ["Git", "Docker", "AWS", "CI/CD", "Agile", "Jest", "Webpack"],
  },
];
