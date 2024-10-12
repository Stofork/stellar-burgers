import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserSlice = {
  isAuthorization: boolean;
  isAuthentication: boolean;
  user: TUser;
  error: string | undefined;
  isLoading: boolean;
};

const initialState: TUserSlice = {
  isAuthorization: false,
  isAuthentication: false,
  user: {
    name: '',
    email: ''
  },
  error: undefined,
  isLoading: false
};
// Получение данных пользователя
export const getUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    const responseUser = await getUserApi();

    if (!responseUser.success) {
      return rejectWithValue(responseUser);
    }

    return responseUser;
  }
);
// Асинхронные запрос
// Регистрация пользователя
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(data);

    if (response.success) {
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    }

    return rejectWithValue(response);
  }
);

// Обновление данных
export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    const response = await updateUserApi(data);

    if (!response.success) {
      return rejectWithValue('Ошибка при изменение данных');
    }

    return response;
  }
);
// Авториазция пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(data);

    if (!response.success) {
      return rejectWithValue('Ошибка при авторизации');
    }

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);
// Выход из аккаунта
export const logoutUser = createAsyncThunk('user/logut', async () => {
  const logout = await logoutApi();

  if (logout.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelectors: (state: TUserSlice) => state,
    getUserData: (state: TUserSlice) => state.user,
    getIsAuthorization: (state: TUserSlice) => state.isAuthorization
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state: TUserSlice) => {
        (state.isLoading = true), (state.isAuthentication = false);
      })
      .addCase(getUser.fulfilled, (state: TUserSlice, action) => {
        state.isAuthorization = true;
        state.isAuthentication = true;
        state.user = action.payload?.user;
        state.error = undefined;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state: TUserSlice) => {
        state.isAuthorization = false;
        state.isAuthentication = true;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state: TUserSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.isAuthorization = true;
        state.isAuthentication = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state: TUserSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.isAuthentication = true;
        state.isAuthorization = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state: TUserSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(logoutUser.fulfilled, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.isAuthentication = false;
        state.isAuthorization = false;
        state.user = initialState.user;
      })
      .addCase(logoutUser.rejected, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state: TUserSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state: TUserSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getUserSelectors, getUserData, getIsAuthorization } =
  userSlice.selectors;
export const userSliceReducer = userSlice.reducer;
