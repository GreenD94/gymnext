import { AuthService, loginUser } from '../actions/auth.actions';
import { AuthError, AuthErrorCode, LoginCredentials, AuthUser } from '../utils/auth.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { jest } from '@jest/globals';

// Mock Supabase client
const mockSupabase = {
  from: jest.fn(),
  auth: {
    signInWithPassword: jest.fn(),
  },
} as unknown as jest.Mocked<SupabaseClient>;

// Test credentials
const validCredentials: LoginCredentials = {
  phoneNumber: '0412-1234567',
  cedula: '1234567',
};

// Mock user data
const mockUser: AuthUser = { id: '123', role: 'client' };

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();
    // Override the default client with our mock
    Object.defineProperty(authService, 'supabase', {
      get: () => mockSupabase,
    });
  });

  describe('findUserByCredentials', () => {
    it('should return user when credentials are valid', async () => {
      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: mockUser, error: null });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
        eq: mockEq,
        single: mockSingle,
      } as any);

      const result = await authService.findUserByCredentials(validCredentials);
      expect(result).toEqual(mockUser);
      expect(mockSelect).toHaveBeenCalledWith('id, role');
      expect(mockEq).toHaveBeenCalledWith('phone_number', validCredentials.phoneNumber);
      expect(mockEq).toHaveBeenCalledWith('cedula', validCredentials.cedula);
    });

    it('should throw INVALID_CREDENTIALS when user not found', async () => {
      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: null, error: null });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
        eq: mockEq,
        single: mockSingle,
      } as any);

      await expect(authService.findUserByCredentials(validCredentials))
        .rejects
        .toThrow(new AuthError('Invalid phone number or cédula.', AuthErrorCode.INVALID_CREDENTIALS));
    });

    it('should throw SUPPORT_REQUIRED on database error', async () => {
      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: null, error: new Error('DB Error') });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
        eq: mockEq,
        single: mockSingle,
      } as any);

      await expect(authService.findUserByCredentials(validCredentials))
        .rejects
        .toThrow(new AuthError('An error occurred while verifying credentials. Please contact support.', AuthErrorCode.SUPPORT_REQUIRED));
    });
  });

  describe('createSession', () => {
    it('should create session successfully', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: {}, error: null } as any);
      await expect(authService.createSession(validCredentials)).resolves.not.toThrow();
    });

    it('should throw SYSTEM_ERROR on session creation failure', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: null, error: new Error('Session Error') } as any);
      await expect(authService.createSession(validCredentials))
        .rejects
        .toThrow(new AuthError('Failed to create session. Please try again.', AuthErrorCode.SYSTEM_ERROR));
    });
  });
});

describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully with valid credentials', async () => {
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockResolvedValue({ data: mockUser, error: null });

    mockSupabase.from.mockReturnValue({
      select: mockSelect,
      eq: mockEq,
      single: mockSingle,
    } as any);
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: {}, error: null } as any);

    const result = await loginUser(validCredentials);
    expect(result).toEqual(mockUser);
  });

  it('should propagate AuthError from service methods', async () => {
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockResolvedValue({ data: null, error: null });

    mockSupabase.from.mockReturnValue({
      select: mockSelect,
      eq: mockEq,
      single: mockSingle,
    } as any);

    await expect(loginUser(validCredentials))
      .rejects
      .toThrow(new AuthError('Invalid phone number or cédula.', AuthErrorCode.INVALID_CREDENTIALS));
  });
}); 