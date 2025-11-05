export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          cover_image: string | null
          status: 'draft' | 'published' | 'archived'
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string
          excerpt?: string
          cover_image?: string | null
          status?: 'draft' | 'published' | 'archived'
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          cover_image?: string | null
          status?: 'draft' | 'published' | 'archived'
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          status: 'draft' | 'published'
          author_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string
          status?: 'draft' | 'published'
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          status?: 'draft' | 'published'
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          url: string
          mime_type: string | null
          size: number | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          url: string
          mime_type?: string | null
          size?: number | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          url?: string
          mime_type?: string | null
          size?: number | null
          uploaded_by?: string | null
          created_at?: string
        }
      }
    }
  }
}
