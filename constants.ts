import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Lon Shan",
  title: "Software Engineer",
  summary: "A Software Engineer with 3 years of working experience in Mobile and Full-stack Web Development. Skilled in building apps from scratch, refactoring systems, and leading teams to deliver projects on time. Proficient in modern frameworks and able to adapt quickly to new tools and work under pressure.",
  location: "Bang Chak, Phra Khanong, Bangkok 10260, Thailand",
  email: "lonshan3010@gmail.com",
  phone: "(+66) 0641618200",
  linkedin: "https://linkedin.com/in/lon-shan-336699db",
  github: "https://github.com/lonshanworld",
  jobsdb: "https://th.jobsdb.com/profile/lon-shan-pwNZ3wmbKy"
};

export const EXPERIENCES: Experience[] = [
  {
    role: "Mid-level Mobile / Cross-Platform / Full-Stack Developer",
    company: "Singtecs Co., Ltd (Singapore) - Remote",
    period: "January 2024 - November 2025",
    description: "Built clinical mobile and web applications from scratch. Mastered multiple frameworks including Flutter, React Native, React, Next.js, Express.js, Node.js, and Nest.js. Implemented AI for chat and autoreply features and collaborated with cross-functional teams using Agile methodologies."
  },
  {
    role: "Cross-platform / Mobile / Front End Web Developer",
    company: "Smthgood Co. (Singapore) - Remote",
    period: "October 2023 - January 2025",
    description: "Led as Team Leader for the web version of a mobile app using Next.js, managing two junior developers. Implemented Jaspr (Dart) for project-specific challenges. Enhanced seller and admin platforms with AWS cloud services and CI/CD pipelines."
  },
  {
    role: "Flutter Developer",
    company: "EfficientSoft Co., Ltd - In-Office",
    period: "January 2023 - August 2023",
    description: "Designed and developed 'QuickFood Riders' and 'QuickFood Merchants' apps. Integrated payment APIs, chat, and video calls. Improved app performance using deep linking and WebSocket technologies. Mentored three junior developers."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Smart Retail POS + Dashboard",
    description: "A comprehensive retail solution with a Flutter Web frontend and Go Fiber backend. Includes merchant login and dashboard analytics.",
    tech: ["Flutter Web", "Go Fiber", "Full-stack"],
    category: "web",
    link: "https://smartretail.lonshan.com",
    year: "2024"
  },
  {
    id: "2",
    title: "Pistil (Women's Health)",
    description: "A health tracking platform built with Laravel. Focused on women's health metrics and data visualization.",
    tech: ["Laravel", "PHP", "Web"],
    category: "web",
    link: "https://pistil.io",
    year: "2024"
  },
  {
    id: "3",
    title: "Air Quality Monitor",
    description: "Full-stack application created using Next.js to monitor and display real-time air quality data.",
    tech: ["Next.js", "Full-stack", "IoT"],
    category: "web",
    link: "https://air-quality-monitor-fw6x.vercel.app/",
    year: "2024"
  },
  {
    id: "4",
    title: "POS Mobile",
    description: "Responsive clinical Point of Sale app using Flutter and SQLite. Delivered within a tight deadline tailored to business workflows.",
    tech: ["Flutter", "BLOC", "SQLite"],
    category: "mobile",
    link: "https://github.com/lonshanworld/pos_mobile.git",
    year: "2023"
  },
  {
    id: "5",
    title: "QuickFood Merchant & Rider",
    description: "Food delivery ecosystem apps for merchants and riders. Features real-time order tracking and management.",
    tech: ["Flutter", "React Native", "Mobile"],
    category: "mobile",
    link: "https://apps.apple.com/us/app/quick-food-merchant/id6477524082",
    year: "2023"
  }
];

export const SKILLS: Skill[] = [
  { category: "Languages", items: ["Dart", "JavaScript", "TypeScript", "PHP", "Golang", "Python", "Lua", "HTML", "CSS"] },
  { category: "Frameworks", items: ["Flutter", "React Native", "React", "Next.js", "Express.js", "Node.js", "Nest.js", "Laravel", "Go-Fiber"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL", "GraphQL", "Firebase", "Prisma ORM"] },
  { category: "CSS & Tools", items: ["Tailwind CSS", "Bootstrap 5", "Git", "GitHub", "Docker", "CI/CD"] }
];

export const SYSTEM_INSTRUCTION = `
You are the AI assistant for Lon Shan's portfolio.
Lon Shan is a Software Engineer with 3 years of experience in Mobile, Web, and Cross-platform development.
Base your answers on the following:
Info: ${JSON.stringify(PERSONAL_INFO)}
Experience: ${JSON.stringify(EXPERIENCES)}
Projects: ${JSON.stringify(PROJECTS)}
Skills: ${JSON.stringify(SKILLS)}

Tone: Professional, confident, and technical.
If asked about contact info, provide the email or LinkedIn from the data.
Key strengths: Adapting quickly to new tools, leading teams, and delivering under pressure.
`;