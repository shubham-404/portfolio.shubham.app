export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  fullDescription?: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  sourceUrl: string;
  featured?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  period: string;
  degree: string;
  gpa: string;
  tags: string[];
  image?: string;
  description: string;
}

export interface Interest {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export type ViewType = 'home' | 'about' | 'services' | 'projects' | 'hire-me';
