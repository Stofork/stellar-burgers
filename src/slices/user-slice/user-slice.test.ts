import { userSlice, getUser, registerUser, loginUser, logoutUser, updateUser } from './user-slice';
import { TUser } from '@utils-types';

const initialState = {
  isAuthorization: false,
  isAuthentication: false,
  user: {
    name: '',
    email: ''
  },
  error: undefined,
  isLoading: false
};

describe('userSlice', () => {
  const { reducer } = userSlice;

  it('должен иметь начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать getUser.pending', () => {
    const action = getUser.pending.type;
    const newState = reducer(initialState, { type: action });

    expect(newState.isLoading).toBe(true);
    expect(newState.isAuthentication).toBe(false);
  });

  it('должен обрабатывать getUser.fulfilled', () => {
    const user: TUser = { name: 'iii', email: 'iii@iii' };
    const action = getUser.fulfilled({
        user,
        success: false
    }, 'requestId');
    const newState = reducer(initialState, action);

    expect(newState.isAuthorization).toBe(true);
    expect(newState.isAuthentication).toBe(true);
    expect(newState.user).toEqual(user);
    expect(newState.isLoading).toBe(false);
  });

  it('должен обрабатывать getUser.rejected', () => {
    const action = getUser.rejected(new Error('Ошибка'), 'requestId');
    const newState = reducer(initialState, action);

    expect(newState.isAuthorization).toBe(false);
    expect(newState.isAuthentication).toBe(true);
    expect(newState.isLoading).toBe(false);
  });

  it('должен обрабатывать registerUser.pending', () => {
    const action = registerUser.pending.type;
    const newState = reducer(initialState, { type: action });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  it('должен обрабатывать registerUser.fulfilled', () => {
    const user: TUser = { name: 'sss', email: 'sss@sss.com' };
    const password = 'sssss';
    const action = registerUser.fulfilled(
        { success: true, user, refreshToken: 'dummyRefreshToken', accessToken: 'dummyAccessToken' },
        'requestId',
        { name: 'sss', email: 'sss@sss.com', password }
    );
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthorization).toBe(true);
    expect(newState.isAuthentication).toBe(true);
    expect(newState.user).toEqual(user);
  });

  it('должен обрабатывать registerUser.rejected', () => {
    const errorMessage = 'Ошибка регистрации';
    const action = registerUser.rejected(
        new Error(errorMessage),
        'requestId',
        { name: '', email: '', password: '' }
    );
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual(errorMessage);
});

  it('должен обрабатывать loginUser.pending', () => {
    const action = loginUser.pending.type;
    const newState = reducer(initialState, { type: action });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  it('должен обрабатывать loginUser.fulfilled', () => {
    const user: TUser = { name: 'Алексей', email: 'aleksey@example.com' };
    const authResponse = {
        success: true,
        user,
        accessToken: 'dummyAccessToken',
        refreshToken: 'dummyRefreshToken'
    };

    const action = loginUser.fulfilled(authResponse, 'requestId', { email: 'eee@eee.com', password: 'dummyPassword' });
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthorization).toBe(true);
    expect(newState.isAuthentication).toBe(true);
    expect(newState.user).toEqual(user);
  });

  it('должен обрабатывать loginUser.rejected', () => {
    const errorMessage = 'Ошибка авторизации';
    const action = loginUser.rejected(
        new Error(errorMessage),
        'requestId',
        { email: 'eee@eee.com', password: 'dummyPassword' }
    );
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual(errorMessage);
});

  it('должен обрабатывать logoutUser.fulfilled', () => {
    const action = logoutUser.fulfilled(undefined, 'requestId');
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthentication).toBe(false);
    expect(newState.isAuthorization).toBe(false);
    expect(newState.user).toEqual(initialState.user);
  });

  it('должен обрабатывать updateUser.pending', () => {
    const action = updateUser.pending.type;
    const newState = reducer(initialState, { type: action });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  it('должен обрабатывать updateUser.fulfilled', () => {
    const updatedUser: TUser = { name: 'ttt', email: 'ttt@ttt.com' };
    const action = updateUser.fulfilled(
        { success: true, user: updatedUser },
        'requestId',
        { name: 'ttt', email: 'ttt@ttt.com' }
    );
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(updatedUser);
});

it('должен обрабатывать updateUser.rejected', () => {
    const errorMessage = 'Ошибка обновления';
    const action = updateUser.rejected(
        new Error(errorMessage),
        'requestId',
        { name: 'ttt' }
    );
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual(errorMessage);
});
});