import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

// Type
import { OAuthService } from '../../services/auth/auth.service';

// Interface
interface User {
  name: string;
  email: string;
  imageUrl?: string;
}

interface AuthError {
  message: string;
  status: number;
}

export interface AuthState {
  auth?: any;
  isLoggedIn: boolean;
  loading: boolean;
  error?: any;
  user?: any;
}

export const initializeOAuthService = createAsyncThunk(
  'auth/initializeOAuthService',
  async (oauthService: OAuthService, thunkAPI: any) => {
    try {
      await thunkAPI.extra.authService.initializeOAuthService(oauthService);
      return await Promise.resolve();
    } catch (err) {
      const error = err as AuthError;
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async (endpoint: string, thunkAPI: any) => {
  try {
    const response = await thunkAPI.extra.authService.isLoggedIn();
    return response;
  } catch (err) {
    const error = err as AuthError;
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async (endpoint: string, thunkAPI: any) => {
  try {
    const response = await thunkAPI.extra.authService.logout();
    return response;
  } catch (err) {
    const error = err as AuthError;
    return thunkAPI.rejectWithValue(error.message ?? error);
  }
});

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ['authLoading']: (state: AuthState) => {
      state.loading = true;
    },
    ['authSuccess']: {
      reducer: (state: AuthState, action: PayloadAction<User>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      },
      prepare: (user: User) => ({ payload: user }),
    },
    ['authFailure']: {
      reducer: (state: AuthState, action: PayloadAction<string>) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      },
      prepare: (value: string) => ({ payload: value }),
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeOAuthService.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(isLoggedIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(isLoggedIn.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
    builder.addCase(isLoggedIn.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      delete state.user;
    });
  },
});

export const { authLoading, authSuccess, authFailure } = authSlice.actions;

export default authSlice.reducer;
