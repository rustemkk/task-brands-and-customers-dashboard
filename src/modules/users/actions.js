import * as usersConstants from './constants';


export const logIn = (email, password) => ({
  type: usersConstants.LOGIN_REQUEST,
  email,
  password,
});

export const logInSuccess = (user) => ({
  type: usersConstants.LOGIN_SUCCESS,
  user,
});

export const setError = (error) => ({
  type: usersConstants.SET_ERROR,
  error,
});

export const logOut = () => ({
  type: usersConstants.LOGOUT_REQUEST,
});

export const signUp = (data) => ({
  type: usersConstants.SIGNUP_REQUEST,
  data,
});