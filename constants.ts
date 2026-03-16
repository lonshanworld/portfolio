import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Lon Shan",
  title: "Software Engineer",
  summary: "Software Engineer with 3+ years of working experience building mobile and full-stack applications. Experienced in developing production systems using Flutter and modern web stacks, building apps from scratch, refactoring systems, and delivering projects on time.",
  location: "Bangkok 10260, Thailand",
  email: "lonshan3010@gmail.com",
  phone: "(+66) 0641618200",
  website: "https://lonshan.com",
  linkedin: "https://linkedin.com/in/lon-shan-336699db",
  github: "https://github.com/lonshanworld",
  jobsdb: "https://lonshan.com"
};

export const EXPERIENCES: Experience[] = [
  {
    role: "Mid-level Mobile / Full-Stack Developer",
    company: "Singtecs Co., Ltd (Singapore) - Remote",
    period: "Jan 2024 - Dec 2025",
    description: "Developed mobile and web applications for clinical and internal systems using Flutter, React, and Next.js. Implemented backend APIs with Node.js and NestJS, integrated AI-powered chat and automated reply functionality, and contributed to production feature delivery and system improvements."
  },
  {
    role: "Cross-platform / Frontend Developer",
    company: "Smthgood Co. (Singapore) - Remote",
    period: "Oct 2023 - Jan 2025",
    description: "Transformed an existing mobile application into a web platform using Next.js. Reimplemented core product features including seller dashboard and admin tools, added new workflows, managed deployment on AWS with CI/CD pipelines, and explored Jaspr for Dart-based web development."
  },
  {
    role: "Flutter Developer",
    company: "EfficientSoft Co., Ltd - Onsite",
    period: "Jan 2023 - Aug 2023",
    description: "Built QuickFood Rider and QuickFood Merchant applications from scratch using Flutter. Implemented authentication, order management, and messaging, integrated backend services, added WebSocket-based real-time communication, and optimized performance including deep linking navigation."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Smart Retail",
    description: "Built a full-stack retail management platform including a public landing interface, POS interface, and merchant dashboard with analytics-focused workflows.",
    tech: ["Flutter", "Go Fiber", "Next.js"],
    categories: ["web", "mobile"],
    link: "https://smartretail.lonshan.com"
  },
  {
    id: "2",
    title: "Pistil - Women's Health Platform",
    description: "Contributed to a women's health platform including public shop, customer, clinic, pharmacy, and admin modules across mobile and web components.",
    tech: ["Laravel", "React Native", "Express.js"],
    categories: ["web", "mobile"],
    link: "https://pistil.io"
  },
  {
    id: "3",
    title: "Singbox Manager",
    description: "Built a lightweight web panel to manage Sing-box VPN servers with configuration generation, client management, and deployment for low-resource VPS environments.",
    tech: ["Go", "net/http", "VPS"],
    categories: ["web"],
    link: ""
  },
  {
    id: "4",
    title: "QuickFood Merchant & Rider",
    description: "Developed QuickFood merchant and rider applications with core delivery workflows and production-ready integrations.",
    tech: ["Flutter", "Mobile Apps", "Real-time"],
    categories: ["mobile"],
    link: "https://apps.apple.com/us/app/quick-food-merchant/id6477524082"
  },
  {
    id: "5",
    title: "QuickFood Rider (Android)",
    description: "Android release of the QuickFood rider application for delivery operations.",
    tech: ["Flutter", "Android", "Delivery"],
    categories: ["mobile"],
    link: "https://play.google.com/store/apps/details?id=com.quickfood.biker"
  }
];

export const SKILLS: Skill[] = [
  { category: "PROGRAMMING LANGUAGES", items: ["TypeScript", "JavaScript", "Dart", "Go", "PHP", "Python"] },
  { category: "BACKEND", items: ["Node.js", "NestJS", "Express.js", "Laravel", "Go Fiber", "Flask", "FastAPI"] },
  { category: "DEVOPS & INFRASTRUCTURE", items: ["Docker", "CI/CD (GitHub Actions, GitLab CI)", "Nginx", "Redis", "PM2", "systemd"] },
  { category: "CLOUD & HOSTING", items: ["AWS (EC2, S3, Lambda)", "Cloudflare", "Vercel", "Render", "VPS (DigitalOcean, OVH, Ionos)"] },
  { category: "FRONTEND", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "MOBILE", items: ["Flutter", "React Native"] },
  { category: "DATABASES", items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Prisma ORM"] }
];

export const SYSTEM_INSTRUCTION = `
You are the AI assistant for Lon Shan's portfolio.
Lon Shan is a Software Engineer with 3+ years of experience in mobile and full-stack development.
Base your answers on the following:
Info: ${JSON.stringify(PERSONAL_INFO)}
Experience: ${JSON.stringify(EXPERIENCES)}
Projects: ${JSON.stringify(PROJECTS)}
Skills: ${JSON.stringify(SKILLS)}

Tone: Professional, confident, and technical.
If asked about contact info, provide the email or LinkedIn from the data.
Key strengths: Building production apps, adapting quickly to new tools, and delivering under pressure.
`;