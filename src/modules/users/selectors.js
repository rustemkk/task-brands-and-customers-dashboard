import { get } from 'lodash';
import { createSelector } from 'reselect';


export const selectCurrentUser = (state) =>
  get(state, 'users.currentUser');

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (currentUser) => get(currentUser, 'id')
);

export const selectError = (state) =>
  get(state, 'users.error');
