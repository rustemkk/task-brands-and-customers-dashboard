import { get } from 'lodash';


export const selectCurrentUser = (state) =>
  get(state, 'users.currentUser');

export const selectError = (state) =>
  get(state, 'users.error');
