export interface LoginCredentials {
  phoneNumber: string;
  cedula: string;
}

export interface AuthUser {
  id: string;
  role: string;
}

export class AuthError extends Error {
  constructor(message: string, public code: AuthErrorCode) {
    super(message);
    this.name = 'AuthError';
  }
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  SUPPORT_REQUIRED = 'SUPPORT_REQUIRED'
} 