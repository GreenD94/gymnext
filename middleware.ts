import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Add CORS headers if needed
  response.headers.set('Access-Control-Allow-Origin', '*');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 