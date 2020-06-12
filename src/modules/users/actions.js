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

export const followBrand = (brandId) => ({
  type: usersConstants.FOLLOW_BRAND_REQUEST,
  brandId,
});

export const unfollowBrand = (brandId) => ({
  type: usersConstants.UNFOLLOW_BRAND_REQUEST,
  brandId,
});

export const givePoints = (customerIds, points) => ({
  type: usersConstants.GIVE_POINTS_REQUEST,
  customerIds,
  points,
});

export const updateCurrentUser = (user) => ({
  type: usersConstants.UPDATE_CURRENT_USER_REQUEST,
  user,
});
