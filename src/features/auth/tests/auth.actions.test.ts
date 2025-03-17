import { AuthService, loginUser } from '../actions/auth.actions';
import { AuthError, AuthErrorCode, LoginCredentials } from '../utils/auth.types';

// Mock Supabase client
const mockSupabase = {
  from: jest.fn(),
  auth: {
    signInWithPassword: jest.fn(),
  },
};

// Test credentials
const validCredentials: LoginCredentials = {
  phoneNumber: '0412-1234567',
  cedula: '1234567',
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(mockSupabase as any);
    jest.clearAllMocks();
  });

  describe('findUserByCredentials', () => {
    it('should return user when credentials are valid', async () => {
      const mockUser = { id: '123', role: 'client' };
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: mockUser, error: null }),
            }),
          }),
        }),
      });

      const result = await authService.findUserByCredentials(validCredentials);
      expect(result).toEqual(mockUser);
    });

    it('should throw INVALID_CREDENTIALS when user not found', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        }),
      });

      await expect(authService.findUserByCredentials(validCredentials))
        .rejects
        .toThrow(new AuthError('Invalid phone number or cédula.', AuthErrorCode.INVALID_CREDENTIALS));
    });

    it('should throw SUPPORT_REQUIRED on database error', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: new Error('DB Error') }),
            }),
          }),
        }),
      });

      await expect(authService.findUserByCredentials(validCredentials))
        .rejects
        .toThrow(new AuthError('An error occurred while verifying credentials. Please contact support.', AuthErrorCode.SUPPORT_REQUIRED));
    });
  });

  describe('createSession', () => {
    it('should create session successfully', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });
      await expect(authService.createSession(validCredentials)).resolves.not.toThrow();
    });

    it('should throw SYSTEM_ERROR on session creation failure', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: new Error('Session Error') });
      await expect(authService.createSession(validCredentials))
        .rejects
        .toThrow(new AuthError('Failed to create session. Please contact support.', AuthErrorCode.SYSTEM_ERROR));
    });
  });
});

describe('loginUser', () => {
  it('should login successfully with valid credentials', async () => {
    const mockUser = { id: '123', role: 'client' };
    mockSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockUser, error: null }),
          }),
        }),
      }),
    });
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    const result = await loginUser(validCredentials);
    expect(result).toEqual(mockUser);
  });

  it('should propagate AuthError from service methods', async () => {
    mockSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      }),
    });

    await expect(loginUser(validCredentials))
      .rejects
      .toThrow(new AuthError('Invalid phone number or cédula.', AuthErrorCode.INVALID_CREDENTIALS));
  });
}); 