import React from 'react';

export interface Section {
  id: string;
  title: string;
  content: string;
  description: string;
  category: Category;
  recommended?: boolean;
}

export type Category = 
  | 'core-principles' 
  | 'frontend' 
  | 'backend' 
  | 'database'
  | 'security'
  | 'devops' 
  | 'testing' 
  | 'ai-guidelines';

export interface SectionGroup {
  label: string;
  value: Category;
  description: string;
  icon: React.ReactNode;
}

export type ViewMode = 'edit' | 'preview';