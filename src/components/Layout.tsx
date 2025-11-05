import { Link, Outlet } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';

export function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1"/>
                <path d="M8 12H24M8 16H24M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>CMS Blog</span>
            </Link>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CMS Blog. Built with React and Vite.</p>
        </div>
      </footer>
    </div>
  );
}
