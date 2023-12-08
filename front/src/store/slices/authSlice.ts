// authSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AuthService from '../../services/authService';
import {PointProps} from '../../utils/types';

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  location: PointProps;
}

const initialState: AuthState = {
  email: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  location: {
    lat: 0,
    lng: 0,
  },
};

const authService = new AuthService();

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: {email: string; password: string}) => {
    try {
      const response = await authService.login(credentials);
      const {data, authToken} = response.data;
      // set token in local storage
      localStorage.setItem('authToken', JSON.stringify(authToken));
      // Return the user email on success
      return data.email;
    } catch (error) {
      // Handle login failure
      throw new Error('Login failed');
    }
  },
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (user: {email: string; password: string}) => {
    try {
      const response = await authService.signup(user);
      const {data, authToken} = response.data;
      // set token in local storage
      localStorage.setItem('authToken', JSON.stringify(authToken));
      // Return the user email on success
      return data.email;
    } catch (error) {
      // Handle signup failure
      throw new Error('Signup failed');
    }
  },
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await authService.logout();
    // Remove token from local storage
    localStorage.removeItem('authToken');
  } catch (error) {
    // Handle logout failure
    throw new Error('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.email = null;
      state.isAuthenticated = false;
    },
    setLocation: (state, action: PayloadAction<PointProps>) => {
      state.location = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.email = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Login failed';
        state.isLoading = false;
      })
      .addCase(signupAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signupAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.email = action.payload;
          state.isAuthenticated = false;
          state.isLoading = false;
        },
      )
      .addCase(signupAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Signup failed';
        state.isLoading = false;
      })
      .addCase(logoutAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.email = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message ?? 'Logout failed';
        state.isLoading = false;
      });
  },
});

// Export the reducer and actions
export const {logOut, setLocation} = authSlice.actions;
export const authReducer = authSlice.reducer;
