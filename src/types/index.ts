export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  status: 'draft' | 'published' | 'archived';
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  mime_type: string | null;
  size: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
}
