import React from 'react';

// Stack/domain tags for manual filtering
export type Stack = 
  | 'react' 
  | 'nextjs' 
  | 'vue' 
  | 'angular'
  | 'node' 
  | 'python' 
  | 'go'
  | 'rust'
  | 'sql' 
  | 'nosql' 
  | 'graphql'
  | 'rest'
  | 'docker' 
  | 'kubernetes'
  | 'aws' 
  | 'azure' 
  | 'gcp'
  | 'typescript'
  | 'universal'; // applies to all stacks

export interface Section {
  id: string;
  title: string;
  content: string;
  description: string;
  category: Category;
  recommended?: boolean;
  /** Search and filtering tags */
  tags?: string[];
  /** Stack/domain targeting - which tech stacks this section applies to */
  appliesTo?: Stack[];
  /** Dependency auto-selection - IDs of sections that should be auto-selected */
  requires?: string[];
  /** Conflict prevention - IDs of sections that conflict with this one */
  conflictsWith?: string[];
}

export type Category = 
  | 'core-principles' 
  | 'frontend' 
  | 'backend' 
  | 'database'
  | 'security'
  | 'devops' 
  | 'testing' 
  | 'ai-guidelines'
  | 'agent-engineering'
  | 'ai-security';

export interface SectionGroup {
  label: string;
  value: Category;
  description: string;
  icon: React.ReactNode;
}

export type ViewMode = 'edit' | 'preview';

export interface SearchResult {
  section: Section;
  score: number;
}