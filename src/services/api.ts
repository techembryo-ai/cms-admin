import { BlogPost, Page } from '../types';

const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || 'https://api.example.com';

const mockPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'getting-started-with-headless-cms',
    title: 'Getting Started with Headless CMS',
    excerpt: 'Learn how to build modern web applications with a headless CMS architecture.',
    content: `# Getting Started with Headless CMS

A headless CMS separates the content management backend from the frontend presentation layer. This approach offers several advantages:

## Benefits

- **Flexibility**: Use any frontend framework or technology
- **Scalability**: Distribute content across multiple platforms
- **Performance**: Optimize each layer independently
- **Developer Experience**: Modern APIs and workflows

## Architecture

The headless approach allows you to:

1. Create content in a centralized system
2. Access it via REST or GraphQL APIs
3. Render it anywhere - web, mobile, IoT devices

## Getting Started

Start by choosing a headless CMS platform that fits your needs. Popular options include Strapi, Contentful, and Sanity.`,
    author: 'Sarah Johnson',
    publishedAt: '2025-01-15',
    coverImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['CMS', 'Architecture', 'Tutorial']
  },
  {
    id: 2,
    slug: 'modern-web-development-trends',
    title: 'Modern Web Development Trends 2025',
    excerpt: 'Explore the latest trends shaping web development in 2025.',
    content: `# Modern Web Development Trends 2025

The web development landscape continues to evolve rapidly. Here are the key trends defining 2025:

## 1. Edge Computing

Moving computation closer to users for better performance and lower latency.

## 2. AI Integration

AI-powered features are becoming standard, from content generation to personalized experiences.

## 3. Web Components

Framework-agnostic components are gaining traction for better reusability.

## 4. Jamstack Evolution

The Jamstack architecture continues to mature with better tooling and patterns.

## Conclusion

Staying current with these trends helps you build better, faster, and more maintainable applications.`,
    author: 'Michael Chen',
    publishedAt: '2025-01-10',
    coverImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Web Development', 'Trends', '2025']
  },
  {
    id: 3,
    slug: 'building-scalable-apis',
    title: 'Building Scalable REST APIs',
    excerpt: 'Best practices for designing and implementing scalable REST APIs.',
    content: `# Building Scalable REST APIs

Creating APIs that can grow with your application requires careful planning and best practices.

## Key Principles

### 1. Design First

Plan your API structure before writing code. Use OpenAPI specifications.

### 2. Versioning

Always version your APIs to maintain backward compatibility.

### 3. Rate Limiting

Protect your infrastructure with appropriate rate limits.

### 4. Caching

Implement caching strategies to reduce load and improve response times.

## Best Practices

- Use consistent naming conventions
- Implement proper error handling
- Document everything
- Monitor performance metrics

## Conclusion

A well-designed API is the foundation of a successful application ecosystem.`,
    author: 'Emily Rodriguez',
    publishedAt: '2025-01-05',
    coverImage: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['API', 'Backend', 'Best Practices']
  }
];

export const api = {
  async getPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      if (!response.ok) {
        console.warn('API not available, using mock data');
        return mockPosts;
      }
      return await response.json();
    } catch (error) {
      console.warn('API not available, using mock data', error);
      return mockPosts;
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
      if (!response.ok) {
        const post = mockPosts.find(p => p.slug === slug);
        return post || null;
      }
      return await response.json();
    } catch (error) {
      console.warn('API not available, using mock data', error);
      const post = mockPosts.find(p => p.slug === slug);
      return post || null;
    }
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/${slug}`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.warn('API not available', error);
      return null;
    }
  }
};
