import {
  TLoginData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
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
};

const initialState: IInitialState = {
  user: {
    name: '',
    email: ''
  }
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

export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async () => await logoutApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
  },
  selectors: {
    getUserDataSelector: (state) => state.user
  }
});

export const reducer = userSlice.reducer;
export const { getUserDataSelector } = userSlice.selectors;
