import { NextResponse } from 'next/server';

export default function middleware() {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 