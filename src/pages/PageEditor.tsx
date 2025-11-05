import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { generateSlug } from '../utils/slug';
import { SEO } from '../components/SEO';

export function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (isEditing) {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    if (!id) return;

    try {
      const page: any = await api.get(`/pages/${id}`, true);

      if (!page) {
        alert('Page not found');
        navigate('/pages');
        return;
      }

      setTitle(page.title);
      setSlug(page.slug);
      setContent(page.content);
      setStatus(page.status);
      setAutoSlug(false);
    } catch (error) {
      console.error('Error fetching page:', error);
      alert('Failed to load page');
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (autoSlug && !isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: FormEvent, newStatus?: 'draft' | 'published') => {
    e.preventDefault();
    setLoading(true);

    const finalStatus = newStatus || status;

    try {
      const pageData: any = {
        title,
        slug,
        content,
        status: finalStatus,
        author_id: user?.id,
      };

      if (isEditing) {
        await api.put(`/pages/${id}`, pageData, true);
      } else {
        await api.post('/pages', pageData, true);
      }

      navigate('/pages');
    } catch (error: any) {
      console.error('Error saving page:', error);
      alert('Failed to save page: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={`${isEditing ? 'Edit' : 'New'} Page - CMS Admin`} />
      <div className="editor">
        <div className="page-header">
          <h1>{isEditing ? 'Edit Page' : 'New Page'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="Enter page title"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="slug">Slug *</label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoSlug(false);
                }}
                required
                placeholder="page-url-slug"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                title="Only lowercase letters, numbers, and hyphens"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="content">Content *</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Write your page content..."
                rows={20}
                className="content-editor"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/pages')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <div className="form-actions-right">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'draft')}
                className="btn-secondary"
                disabled={loading}
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'published')}
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
