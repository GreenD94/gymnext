'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProviderWrapper } from './query-client.provider';
import { LanguageProvider } from './language.provider';
import { ThemeProvider } from './theme.provider';
import { NextIntlClientProvider } from 'next-intl';
import { useMessages } from '../hooks/use-messages.hook';
import type { ReactNode } from 'react';
import type { Locale } from '../messages';

interface RootProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function RootProvider({ children, initialLocale = 'en' }: RootProviderProps) {
  const { messages, locale } = useMessages();

  return (
    <LanguageProvider initialLocale={initialLocale}>
      <NextIntlClientProvider 
        messages={messages} 
        locale={locale}
        timeZone="America/Bogota"
        now={new Date()}
      >
        <ThemeProvider>
          <CssBaseline enableColorScheme />
          <QueryClientProviderWrapper>
            {children}
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </NextIntlClientProvider>
    </LanguageProvider>
  );
} 