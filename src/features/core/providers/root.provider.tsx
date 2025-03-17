'use client';

import { ReactNode } from 'react';
import { QueryClientProviderWrapper } from './query-client.provider';
import { ThemeProvider } from './theme.provider';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ThemeProvider>
      <QueryClientProviderWrapper>
        {/* Add other providers here as needed */}
        {children}
      </QueryClientProviderWrapper>
    </ThemeProvider>
  );
} 