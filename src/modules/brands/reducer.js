import { uniq } from 'lodash';
import { combineReducers } from 'redux';

import * as brandsConstants from './constants';


export const brands = (state = {}, action) => {
  switch (action.type) {
    case brandsConstants.LOAD_BRANDS_SUCCESS:
      return { ...state, ...action.brands };
    default:
      return state;
  }
};

export const brandsIds = (state = [], action) => {
  switch (action.type) {
    case brandsConstants.LOAD_BRANDS_SUCCESS:
      return uniq([...state, ...action.brandsIds]);
    default:
      return state;
  }
};

export default combineReducers({
  brands,
  brandsIds,
});
