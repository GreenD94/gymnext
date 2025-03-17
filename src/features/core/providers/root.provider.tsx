'use client';

import { ReactNode } from 'react';
import { QueryClientProviderWrapper } from './query-client.provider';
import { ThemeProvider } from './theme.provider';
import { LanguageProvider, useLanguage } from './language.provider';
import { NextIntlClientProvider } from 'next-intl';
import { messages, type Locale } from '../messages';

interface RootProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function RootProvider({ children, initialLocale = 'en' }: RootProviderProps) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <LanguageConsumer>
        {(locale) => (
          <NextIntlClientProvider 
            messages={messages[locale]} 
            locale={locale}
            timeZone="America/Bogota"
            now={new Date()}
          >
            <ThemeProvider>
              <QueryClientProviderWrapper>
                {/* Add other providers here as needed */}
                {children}
              </QueryClientProviderWrapper>
            </ThemeProvider>
          </NextIntlClientProvider>
        )}
      </LanguageConsumer>
    </LanguageProvider>
  );
}

function LanguageConsumer({ children }: { children: (locale: Locale) => ReactNode }) {
  const { locale } = useLanguage();
  return <>{children(locale)}</>;
} 