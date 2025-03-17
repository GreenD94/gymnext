'use client';

import { createContext, useContext, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
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
  initialLocale?: Language;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = useCallback((newLanguage: Language) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLanguage}`);
    router.push(newPath);
  }, [pathname, router]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language: initialLocale, 
        changeLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
} 