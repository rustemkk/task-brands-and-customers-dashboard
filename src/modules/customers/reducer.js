import { uniq } from 'lodash';
import { combineReducers } from 'redux';

import * as customersConstants from './constants';


export const customers = (state = {}, action) => {
  switch (action.type) {
    case customersConstants.LOAD_CUSTOMERS_SUCCESS:
      return { ...state, ...action.customers };
    default:
      return state;
  }
};

export const customersIds = (state = [], action) => {
  switch (action.type) {
    case customersConstants.LOAD_CUSTOMERS_SUCCESS:
      return uniq([...state, ...action.customersIds]);
    default:
      return state;
  }
};

export default combineReducers({
  customers,
  customersIds,
});
