import { createAction, createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  imageUrl?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error?: any;
  user?: any;
}

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async (endpoint: string, thunkAPI: any) => {
  try {
    const response = await thunkAPI.extra.authService.isLoggedIn();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
        state.user = action.payload;
      },
      prepare: (user: User) => ({ payload: user }),
    },
    ['authFailure']: {
      reducer: (state: AuthState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      prepare: (value: string) => ({ payload: value }),
    },
  },
  extraReducers: {
    [isLoggedIn.pending.toString()]: (state: AuthState) => {
      state.loading = true;
    },
    [isLoggedIn.rejected.toString()]: (state: AuthState, action: PayloadAction) => {
      state.loading = false;
      state.error = action.payload;
    },
    [isLoggedIn.fulfilled.toString()]: (state: AuthState, action: PayloadAction) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const { authLoading, authSuccess, authFailure } = authSlice.actions;

export default authSlice.reducer;
