import { Link, Outlet, useNavigate } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1"/>
              <path d="M8 12H24M8 16H24M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>CMS Admin</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" fill="currentColor"/>
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link to="/posts" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" fill="currentColor"/>
            </svg>
            <span>Posts</span>
          </Link>

          <Link to="/pages" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" fill="currentColor"/>
            </svg>
            <span>Pages</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <DarkModeToggle />
          {user && (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-email">{user.email}</span>
              </div>
              <button onClick={handleSignOut} className="btn-signout">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3m0 0l-3-3m3 3H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
