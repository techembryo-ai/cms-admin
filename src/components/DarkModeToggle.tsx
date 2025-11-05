import { useTheme } from '../context/ThemeContext';

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 3.5C6.41 3.5 3.5 6.41 3.5 10C3.5 13.59 6.41 16.5 10 16.5C13.59 16.5 16.5 13.59 16.5 10C16.5 6.41 13.59 3.5 10 3.5ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15Z"
            fill="currentColor"
          />
          <path
            d="M10 0C9.59 0 9.25 0.34 9.25 0.75V2.25C9.25 2.66 9.59 3 10 3C10.41 3 10.75 2.66 10.75 2.25V0.75C10.75 0.34 10.41 0 10 0Z"
            fill="currentColor"
          />
          <path
            d="M10 17C9.59 17 9.25 17.34 9.25 17.75V19.25C9.25 19.66 9.59 20 10 20C10.41 20 10.75 19.66 10.75 19.25V17.75C10.75 17.34 10.41 17 10 17Z"
            fill="currentColor"
          />
          <path
            d="M19.25 9.25H17.75C17.34 9.25 17 9.59 17 10C17 10.41 17.34 10.75 17.75 10.75H19.25C19.66 10.75 20 10.41 20 10C20 9.59 19.66 9.25 19.25 9.25Z"
            fill="currentColor"
          />
          <path
            d="M3 10C3 9.59 2.66 9.25 2.25 9.25H0.75C0.34 9.25 0 9.59 0 10C0 10.41 0.34 10.75 0.75 10.75H2.25C2.66 10.75 3 10.41 3 10Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2C10 0.9 10.9 0 12 0C17.5 0 22 4.5 22 10C22 15.5 17.5 20 12 20C6.5 20 2 15.5 2 10C2 8.9 2.9 8 4 8C5.1 8 6 8.9 6 10C6 13.3 8.7 16 12 16C15.3 16 18 13.3 18 10C18 6.7 15.3 4 12 4C10.9 4 10 3.1 10 2Z"
            fill="currentColor"
            transform="scale(0.9) translate(1, 1)"
          />
        </svg>
      )}
    </button>
  );
}
