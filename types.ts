export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  category: 'mobile' | 'web' | 'cross-platform' | 'iot';
  year: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export type ViewMode = 'modern' | 'retro';