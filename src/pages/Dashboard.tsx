import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalPages: number;
  totalTags: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalPages: 0,
    totalTags: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsResult, pagesResult, tagsResult] = await Promise.all([
          supabase.from('posts').select('status', { count: 'exact' }),
          supabase.from('pages').select('id', { count: 'exact', head: true }),
          supabase.from('tags').select('id', { count: 'exact', head: true }),
        ]);

        const posts = (postsResult.data || []) as Array<{ status: string }>;
        const publishedCount = posts.filter(p => p.status === 'published').length;
        const draftCount = posts.filter(p => p.status === 'draft').length;

        setStats({
          totalPosts: postsResult.count || 0,
          publishedPosts: publishedCount,
          draftPosts: draftCount,
          totalPages: pagesResult.count || 0,
          totalTags: tagsResult.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <SEO title="Dashboard - CMS Admin" />
      <div className="dashboard">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome to your content management system</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalPosts}</div>
              <div className="stat-label">Total Posts</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.publishedPosts}</div>
              <div className="stat-label">Published</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.draftPosts}</div>
              <div className="stat-label">Drafts</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalPages}</div>
              <div className="stat-label">Pages</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalTags}</div>
              <div className="stat-label">Tags</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <Link to="/posts/new" className="action-card">
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>New Post</h3>
              <p>Create a new blog post</p>
            </Link>

            <Link to="/pages/new" className="action-card">
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>New Page</h3>
              <p>Create a new page</p>
            </Link>

            <Link to="/posts" className="action-card">
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>View All Posts</h3>
              <p>Manage your blog posts</p>
            </Link>

            <Link to="/pages" className="action-card">
              <div className="action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>View All Pages</h3>
              <p>Manage your pages</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
