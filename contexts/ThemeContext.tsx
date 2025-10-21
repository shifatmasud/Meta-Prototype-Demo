import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import { lightTokens, darkTokens } from '../theme.ts';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  theme: typeof lightTokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const storedPreference = window.localStorage.getItem('theme-mode');
      return storedPreference === 'light' ? 'light' : 'dark';
    } catch (error) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('theme-mode', themeMode);
      document.documentElement.className = themeMode;
    } catch (error) {
      console.error('Could not save theme preference:', error);
    }
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => (themeMode === 'light' ? lightTokens : darkTokens), [themeMode]);

  const value = { themeMode, toggleTheme, theme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
