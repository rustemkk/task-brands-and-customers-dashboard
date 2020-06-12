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

export const customerBrands = (state = [], action) => {
  switch (action.type) {
    case customersConstants.CREATE_CUSTOMER_BRAND_REQUEST:
      return [...state, action.customerBrand];
    case customersConstants.UPDATE_CUSTOMER_BRAND_REQUEST: {
      const newState = [...state];
      const index = newState.findIndex(cb => cb.customerId === action.customerId && cb.brandId === action.brandId);
      newState[index] = { ...newState[index], ...action.customerBrand };
      return newState;
    }
    case customersConstants.UPDATE_CUSTOMER_BRANDS_REQUEST: {
      const newState = [...state];
      action.customerBrands.forEach(customerBrand => {
        const index = newState.findIndex(cb =>
          cb.customerId === customerBrand.customerId && cb.brandId === customerBrand.brandId
        );
        newState[index] = { ...newState[index], ...customerBrand };
      });
      return newState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  customers,
  customersIds,
  customerBrands,
});
