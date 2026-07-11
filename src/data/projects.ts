export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
  demoImages?: string[];
  status?: "pending" | "completed";
}

export const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    title: "Lagatama Craft",
    description:
      "A full-featured e-commerce platform for handcrafted goods with user authentication, product catalog, shopping cart, and PayHere payment integration.",
    longDescription:
      "Built a scalable e-commerce solution for Lagatama Craft featuring secure authentication with Google sign-in, real-time inventory management, product filtering, a seamless checkout flow, and PayHere payment integration. The platform supports order tracking, delivery fee calculation, and responsive design across all devices.",
    technologies: ["PHP", "MySQL", "PayHere", "JavaScript"],
    image: "/images/projects/e-commerce/shop.png",
    link: "#",
    github: "#",
    demoImages: [
      "/images/projects/e-commerce/shop.png",
      "/images/projects/e-commerce/product-detail.png",
      "/images/projects/e-commerce/checkout.png",
      "/images/projects/e-commerce/sign-up.png",
    ],
    status: "completed",
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS with Mobile App",
    description:
      "Point-of-sale system for restaurants with order management, table tracking, kitchen display, and a companion mobile app for waitstaff.",
    longDescription:
      "A restaurant POS solution that streamlines order taking, table management, and kitchen workflows. The mobile app lets waitstaff send orders directly to the kitchen, track table status, and process payments — all synced in real time with the main POS terminal.",
    technologies: ["React Native", "Node.js", "MySQL", "Socket.io"],
    link: "#",
    github: "#",
    demoImages: [
      "/images/projects/restaurantPOS/login.png",
      "/images/projects/restaurantPOS/posInterface.png",
    ],
    status: "completed",
  },
  {
    slug: "supermarket-pos",
    title: "Supermarket POS",
    description:
      "Retail point-of-sale system with barcode scanning, inventory management, receipt printing, and sales reporting for supermarkets.",
    longDescription:
      "A supermarket POS built for high-volume retail operations. Features include barcode scanning, real-time stock updates, multi-payment support, receipt printing, and daily sales reports. Designed for fast checkout and accurate inventory tracking.",
    technologies: ["Java", "MySQL", "Swing", "JasperReports"],
    link: "#",
    github: "#",
    status: "completed",
  },
  {
    slug: "lms",
    title: "Learning Management System",
    description:
      "An online learning platform for course management, student enrollment, assignments, and progress tracking.",
    longDescription:
      "A learning management system that enables instructors to create and manage courses, upload materials, assign work, and track student progress. Students can enroll in courses, submit assignments, and view grades — all from a single platform.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
    github: "#",
    status: "pending",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
