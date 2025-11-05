import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { generateSlug } from '../utils/slug';
import { SEO } from '../components/SEO';

export function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        alert('Post not found');
        navigate('/posts');
        return;
      }

      const post: any = data;
      setTitle(post.title);
      setSlug(post.slug);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setCoverImage(post.cover_image || '');
      setStatus(post.status);
      setAutoSlug(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Failed to load post');
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (autoSlug && !isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: FormEvent, newStatus?: 'draft' | 'published' | 'archived') => {
    e.preventDefault();
    setLoading(true);

    const finalStatus = newStatus || status;

    try {
      const postData: any = {
        title,
        slug,
        content,
        excerpt,
        cover_image: coverImage || null,
        status: finalStatus,
        author_id: user?.id,
        published_at: finalStatus === 'published' && !isEditing ? new Date().toISOString() : undefined,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id!);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([postData]);

        if (error) throw error;
      }

      navigate('/posts');
    } catch (error: any) {
      console.error('Error saving post:', error);
      if (error.code === '23505') {
        alert('A post with this slug already exists. Please use a different slug.');
      } else {
        alert('Failed to save post: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={`${isEditing ? 'Edit' : 'New'} Post - CMS Admin`} />
      <div className="editor">
        <div className="page-header">
          <h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
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
                placeholder="Enter post title"
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
                placeholder="post-url-slug"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                title="Only lowercase letters, numbers, and hyphens"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of your post"
                rows={3}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cover-image">Cover Image URL</label>
              <input
                id="cover-image"
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
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
                placeholder="Write your post content..."
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
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'archived')}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/posts')}
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
