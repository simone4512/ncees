import axiosInstance from '../lib/axiosInstance';

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface GoogleLoginPayload {
  token: string; // Firebase/Google ID token
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// Shape Laravel's ServiceResponse wrapper
interface ServiceResponse<T> {
  status: boolean;
  action: string;
  message: string;
  data: T;
  errors: Record<string, string[]>;
  httpStatus: number;
}

const authService = {
  /**
   * POST /api/v1/register
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<ServiceResponse<AuthResponse>>('/register', credentials);
    localStorage.setItem('auth_token', data.data.token);
    return data.data;
  },

  /**
   * POST /api/v1/login
   * Authenticate with email + password (Laravel Sanctum)
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<ServiceResponse<AuthResponse>>('/login', credentials);
    localStorage.setItem('auth_token', data.data.token);
    return data.data;
  },

  /**
   * POST /api/v1/auth/google
   * Authenticate via Google ID token
   */
  googleLogin: async (payload: GoogleLoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<ServiceResponse<AuthResponse>>('/auth/google', payload);
    localStorage.setItem('auth_token', data.data.token);
    return data.data;
  },

  /**
   * GET /api/v1/me
   * Fetch the currently authenticated user (requires token)
   */
  getMe: async (): Promise<AuthUser> => {
    const { data } = await axiosInstance.get<ServiceResponse<AuthUser>>('/me');
    return data.data;
  },

  /**
   * POST /api/v1/logout
   * Revoke the current Sanctum token
   */
  logout: async (): Promise<void> => {
    await axiosInstance.post('/logout');
    localStorage.removeItem('auth_token');
  },
};

export default authService;
