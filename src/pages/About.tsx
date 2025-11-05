import { SEO } from '../components/SEO';

export function About() {
  return (
    <>
      <SEO
        title="About - CMS Blog"
        description="Learn more about our headless CMS blog platform."
      />
      <div className="container">
        <div className="about-page">
          <h1>About CMS Blog</h1>
          <div className="about-content">
            <p>
              Welcome to CMS Blog, a modern web application built with a headless CMS architecture.
              This platform demonstrates how to create a flexible, scalable content management system
              that separates content from presentation.
            </p>
            <h2>Features</h2>
            <ul>
              <li>Dynamic routing for blog posts with slug-based URLs</li>
              <li>REST API integration for content fetching</li>
              <li>Dark mode support with persistent theme preferences</li>
              <li>SEO-optimized with meta tags for better search visibility</li>
              <li>Responsive design for all devices</li>
              <li>Reusable component architecture</li>
            </ul>
            <h2>Technology Stack</h2>
            <ul>
              <li>React 18 with TypeScript</li>
              <li>Vite for blazing-fast development</li>
              <li>React Router for client-side routing</li>
              <li>Context API for state management</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
