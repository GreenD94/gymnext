'use client';

import { ReactNode } from 'react';
import { QueryClientProviderWrapper } from './query-client.provider';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryClientProviderWrapper>
      {/* Add other providers here as needed */}
      {children}
    </QueryClientProviderWrapper>
  );
} 