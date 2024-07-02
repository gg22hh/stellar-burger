import {
  TLoginData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';

type TUserData = {
  name: string;
  password: string;
  email: string;
};

type IInitialState = {
  user: {
    name: string;
    email: string;
  };
  isUserAuth: boolean;
};

const initialState: IInitialState = {
  user: {
    name: '',
    email: ''
  },
  isUserAuth: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TUserData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: TUserData) => {
    const data = await updateUserApi(userData);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUserrr', async () =>
  getUserApi()
);

export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async () => await logoutApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isUserAuth = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user.name = '';
      state.user.email = '';
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
  },
  selectors: {
    getUserDataSelector: (state) => state.user,
    getIsUserAuthSelector: (state) => state.isUserAuth
  }
});

export const reducer = userSlice.reducer;
export const { authChecked } = userSlice.actions;
export const { getUserDataSelector, getIsUserAuthSelector } =
  userSlice.selectors;
