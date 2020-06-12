import { get } from 'lodash';
import { createSelector } from 'reselect';


export const selectCustomersEntities = (state) =>
  get(state, 'customers.customers') || {};

export const selectCustomersIds = (state) =>
  get(state, 'customers.customersIds') || [];

export const selectAllCustomers = createSelector(
  selectCustomersEntities,
  selectCustomersIds,
  (customers, customersIds) => customersIds.map(id => customers[id])
);

export const selectCustomerById = (customerId) => createSelector(
  selectCustomersEntities,
  (customers) => customers[customerId]
);

export const selectCustomerByEmail = (email) => createSelector(
  selectAllCustomers,
  (customers) => customers.find(c => c.email === email)
);

export const selectCustomerByEmailAndPassword = (email, password) => createSelector(
  selectAllCustomers,
  (customers) => customers.find(c => c.email === email && c.password === password)
);

export const selectAllCustomerBrands = (state) =>
  get(state, 'customers.customerBrands') || [];

export const selectCustomerBrandsByCustomerId = (customerId) => createSelector(
  selectAllCustomerBrands,
  (customerBrands) => customerBrands.filter(cb => cb.customerId === customerId)
);
