import { combineReducers } from 'redux';

import * as usersConstants from './constants';


export const currentUser = (state = null, action) => {
  switch (action.type) {
    case usersConstants.LOGIN_SUCCESS:
      return action.user;
    case usersConstants.LOGOUT_REQUEST:
      return null;
    default:
      return state;
  }
};

export const error = (state = '', action) => {
  switch (action.type) {
    case usersConstants.SET_ERROR:
      return action.error;
    default:
      return state;
  }
};

export default combineReducers({
  currentUser,
  error,
});
