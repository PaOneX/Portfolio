export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    year: "2024",
    credentialUrl: "#",
  },
  {
    name: "Meta Front-End Developer",
    issuer: "Meta",
    year: "2023",
    credentialUrl: "#",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    year: "2023",
    credentialUrl: "#",
  },
];
