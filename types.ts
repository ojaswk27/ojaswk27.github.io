import type { ReactNode } from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  descriptionPoints: string[];
}

export interface Achievement {
  title: string;
  event: string;
  date: string;
}

export interface Skill {
  name: string;
  icon: ReactNode;
}
