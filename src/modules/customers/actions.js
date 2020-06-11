import * as customersConstants from './constants';


export const loadCustomers = () => ({
  type: customersConstants.LOAD_CUSTOMERS_REQUEST,
});

export const loadCustomersSuccess = ({ entities: { customers }, result }) => ({
  type: customersConstants.LOAD_CUSTOMERS_SUCCESS,
  customers,
  customersIds: result,
});

export const createCustomer = (email, password, firstName, lastName) => ({
  type: customersConstants.CREATE_CUSTOMER_REQUEST,
  email,
  password,
  firstName,
  lastName,
});
