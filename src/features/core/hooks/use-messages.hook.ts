import { useLanguage } from '../providers/language.provider';
import { messages } from '../messages';

export function useMessages() {
  const { locale } = useLanguage();
  return {
    messages: messages[locale],
    locale
  };
} 