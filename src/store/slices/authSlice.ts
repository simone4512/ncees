import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService, {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  GoogleLoginPayload,
} from '../../services/authService';

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
};

/* ─────────────────────────────────────────
   THUNKS
───────────────────────────────────────── */

/** Register a new account */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      return await authService.register(credentials);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

/** Login with email + password */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

/** Login via Google ID token */
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (payload: GoogleLoginPayload, { rejectWithValue }) => {
    try {
      return await authService.googleLogin(payload);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Google login failed';
      return rejectWithValue(message);
    }
  }
);

/** Fetch current user — run on app boot if token exists */
export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getMe();
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Failed to fetch user';
      return rejectWithValue(message);
    }
  }
);

/** Logout and revoke Sanctum token */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return;
    } catch (err: any) {
      // Even if the request fails, clear local state
      localStorage.removeItem('auth_token');
      return rejectWithValue(err.message);
    }
  }
);

/* ─────────────────────────────────────────
   SLICE
───────────────────────────────────────── */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Manually clear auth state (e.g. on 401 from axios interceptor) */
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ── register ── */
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ── login ── */
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ── googleLogin ── */
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ── fetchMe ── */
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });

    /* ── logout ── */
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        // Clear state regardless
        state.loading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
