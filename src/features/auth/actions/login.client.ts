'use client';

import { loginUser } from './auth.actions';
import { LoginCredentials, AuthUser } from '../utils/auth.types';

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  return loginUser(credentials);
} 