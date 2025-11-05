import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      {post.coverImage && (
        <div className="blog-card-image">
          <img src={post.coverImage} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-author">{post.author}</span>
          <span className="blog-card-date">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <h2 className="blog-card-title">
          <Link to={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="blog-card-tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-card-tag">{tag}</span>
            ))}
          </div>
        )}
        <Link to={`/posts/${post.slug}`} className="blog-card-link">
          Read More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}
