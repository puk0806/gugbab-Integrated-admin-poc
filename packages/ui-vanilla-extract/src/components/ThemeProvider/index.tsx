import { useEffect } from 'react';
import { ThemeProviderProps } from '@types';

const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storageTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute(
      'data-theme-mode',
      theme
        ? theme
        : storageTheme === 'dark'
          ? 'dark'
          : storageTheme === 'light'
            ? 'light'
            : isDarkMode
              ? 'dark'
              : 'light',
    );
  }, [theme]);

  return children;
};

export default ThemeProvider;
