import en from './en.json';
import es from './es.json';

export const messages = {
  en,
  es,
} as const;

export type Messages = typeof messages;
export type Locale = keyof Messages; 