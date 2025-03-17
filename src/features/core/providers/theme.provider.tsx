'use client';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@mui/material';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#2563eb', // Blue-600
            light: '#60a5fa', // Blue-400
            dark: '#1d4ed8', // Blue-700
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#7c3aed', // Violet-600
            light: '#a78bfa', // Violet-400
            dark: '#6d28d9', // Violet-700
            contrastText: '#ffffff',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0f172a', // Slate-50 : Slate-900
            paper: mode === 'light' ? '#ffffff' : '#1e293b', // White : Slate-800
          },
          text: {
            primary: mode === 'light' ? '#1e293b' : '#f8fafc', // Slate-800 : Slate-50
            secondary: mode === 'light' ? '#475569' : '#cbd5e1', // Slate-600 : Slate-300
          },
          divider: mode === 'light' ? '#e2e8f0' : '#334155', // Slate-200 : Slate-700
          error: {
            main: '#ef4444', // Red-500
            light: '#f87171', // Red-400
            dark: '#dc2626', // Red-600
          },
          warning: {
            main: '#f59e0b', // Amber-500
            light: '#fbbf24', // Amber-400
            dark: '#d97706', // Amber-600
          },
          success: {
            main: '#10b981', // Emerald-500
            light: '#34d399', // Emerald-400
            dark: '#059669', // Emerald-600
          },
          info: {
            main: '#0ea5e9', // Sky-500
            light: '#38bdf8', // Sky-400
            dark: '#0284c7', // Sky-600
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: 'var(--font-inter)',
          h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 600,
            fontSize: '2rem',
          },
          h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
          },
          h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
          },
          h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
          },
          h6: {
            fontWeight: 600,
            fontSize: '1rem',
          },
          subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
          },
          subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                borderRadius: 12,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
                borderBottom: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
} 