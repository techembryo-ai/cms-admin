import { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { BlogCard } from '../components/BlogCard';
import { SEO } from '../components/SEO';

export function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="CMS Blog - Modern Web Development"
        description="Explore articles about modern web development, headless CMS, and best practices."
      />
      <div className="container">
        <div className="hero">
          <h1>Welcome to CMS Blog</h1>
          <p>Explore articles about modern web development, architecture, and best practices</p>
        </div>
        <div className="blog-grid">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
