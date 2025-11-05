export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
}
