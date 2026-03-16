export type ProjectCategory = 'mobile' | 'web' | 'cross-platform' | 'iot' | 'game' | 'html5';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  categories: ProjectCategory[];
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