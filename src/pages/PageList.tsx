import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Page } from '../types';
import { SEO } from '../components/SEO';

export function PageList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase.from('pages').delete().eq('id', id);

      if (error) throw error;
      setPages(pages.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Failed to delete page');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading pages...</p>
      </div>
    );
  }

  return (
    <>
      <SEO title="Pages - CMS Admin" />
      <div className="content-list">
        <div className="page-header">
          <div>
            <h1>Pages</h1>
            <p>Manage your pages</p>
          </div>
          <Link to="/pages/new" className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12m6-6H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Page
          </Link>
        </div>

        {pages.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M16 16h32M16 24h32M16 32h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>No pages found</h3>
            <p>Create your first page to get started</p>
            <Link to="/pages/new" className="btn-primary">Create Page</Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(page => (
                  <tr key={page.id}>
                    <td>
                      <div className="post-title-cell">
                        <Link to={`/pages/${page.id}/edit`} className="post-title-link">
                          {page.title || 'Untitled'}
                        </Link>
                        <span className="post-slug">/{page.slug}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${page.status}`}>
                        {page.status}
                      </span>
                    </td>
                    <td>{formatDate(page.created_at)}</td>
                    <td>{formatDate(page.updated_at)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/pages/${page.id}/edit`} className="btn-icon" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.333 2A1.886 1.886 0 0114 4.667l-9 9-3.667.666L2 10.667l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="btn-icon btn-danger"
                          title="Delete"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
