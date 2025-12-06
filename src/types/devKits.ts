export interface DevKit {
  id: string;
  name: string;
  description: string;
  logo?: string;
  url: string;
  github?: string;
  category: 'libraries' | 'icons' | 'fonts'| 'tools'| 'nocode';
  tags: string[];
}

