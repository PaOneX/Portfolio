export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
  demoVideo?: string;
}

export const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
    longDescription:
      "Built a scalable e-commerce solution featuring secure authentication, real-time inventory management, a seamless shopping cart experience, and Stripe payment integration. The platform supports admin dashboards, order tracking, and responsive design across all devices.",
    technologies: ["PHP", "MySQL", "Stripe"],
    image: "/images/project-ecommerce.jpg",
    link: "#",
    github: "#",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    description:
      "Real-time collaborative task management application with drag-and-drop functionality and team collaboration features.",
    longDescription:
      "A collaborative productivity tool enabling teams to organize tasks with drag-and-drop boards, real-time updates via WebSocket, role-based permissions, and activity feeds. Built for speed and seamless team coordination.",
    technologies: ["React", "Firebase", "Material-UI", "WebSocket"],
    image: "/images/project-tasks.jpg",
    link: "#",
    github: "#",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard showing current conditions and forecasts with beautiful visualizations and location search.",
    longDescription:
      "An interactive weather application with location-based search, 7-day forecasts, animated weather visualizations using Chart.js, and geolocation support. Designed with a focus on clarity and delightful micro-interactions.",
    technologies: ["Angular", "TypeScript", "Chart.js", "Weather API"],
    image: "/images/project-weather.jpg",
    link: "#",
    github: "#",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "social-media-analytics",
    title: "Social Media Analytics",
    description:
      "Analytics platform for tracking social media metrics, engagement rates, and audience insights with comprehensive reports.",
    longDescription:
      "A data-driven analytics platform that aggregates social media metrics across platforms, generates engagement reports, and visualizes audience demographics with D3.js charts. Includes exportable PDF reports and scheduled email digests.",
    technologies: ["Python", "Django", "PostgreSQL", "D3.js"],
    image: "/images/project-analytics.jpg",
    link: "#",
    github: "#",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
