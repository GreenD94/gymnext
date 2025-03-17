'use client';

import { ReactNode } from 'react';
import { QueryClientProviderWrapper } from './query-client.provider';
import { ThemeProvider } from './theme.provider';
import { LanguageProvider } from './language.provider';
import { NextIntlClientProvider } from 'next-intl';
import { messages, type Locale } from '../messages';

interface RootProviderProps {
  children: ReactNode;
  locale?: Locale;
}

export function RootProvider({ children, locale = 'en' }: RootProviderProps) {
  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      <LanguageProvider initialLocale={locale}>
        <ThemeProvider>
          <QueryClientProviderWrapper>
            {/* Add other providers here as needed */}
            {children}
          </QueryClientProviderWrapper>
        </ThemeProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
} 