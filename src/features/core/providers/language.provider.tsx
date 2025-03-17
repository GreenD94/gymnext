'use client';

import { createContext, useContext, useState } from 'react';
import type { Locale } from '../messages';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export function LanguageProvider({ 
  children,
  initialLocale = 'en'
}: { 
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  return (
    <LanguageContext.Provider 
      value={{ 
        locale,
        setLocale
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
} 