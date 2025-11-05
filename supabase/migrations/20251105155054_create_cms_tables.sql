/*
  # CMS Database Schema

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `content` (text, required)
      - `excerpt` (text)
      - `cover_image` (text, URL)
      - `status` (text: draft, published, archived)
      - `author_id` (uuid, foreign key to auth.users)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `pages`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `content` (text, required)
      - `status` (text: draft, published)
      - `author_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique, required)
      - `slug` (text, unique, required)
      - `created_at` (timestamptz)
      
    - `post_tags`
      - `post_id` (uuid, foreign key to posts)
      - `tag_id` (uuid, foreign key to tags)
      - Primary key on (post_id, tag_id)
      
    - `media`
      - `id` (uuid, primary key)
      - `filename` (text, required)
      - `url` (text, required)
      - `mime_type` (text)
      - `size` (bigint, bytes)
      - `uploaded_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL DEFAULT '',
  excerpt text DEFAULT '',
  cover_image text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create post_tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  mime_type text,
  size bigint,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts(status);
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON posts(author_id);
CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages(slug);
CREATE INDEX IF NOT EXISTS tags_slug_idx ON tags(slug);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Authenticated users can view all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Pages policies
CREATE POLICY "Authenticated users can view all pages"
  ON pages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create pages"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own pages"
  ON pages FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own pages"
  ON pages FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Tags policies
CREATE POLICY "Authenticated users can view all tags"
  ON tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tags"
  ON tags FOR DELETE
  TO authenticated
  USING (true);

-- Post tags policies
CREATE POLICY "Authenticated users can view post tags"
  ON post_tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create post tags"
  ON post_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete post tags"
  ON post_tags FOR DELETE
  TO authenticated
  USING (true);

-- Media policies
CREATE POLICY "Authenticated users can view all media"
  ON media FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own media"
  ON media FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
