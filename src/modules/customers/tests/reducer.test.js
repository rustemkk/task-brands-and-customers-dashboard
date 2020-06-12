import { normalize } from 'normalizr';

import * as customersActions from '../actions';
import * as customersReducers from '../reducer';
import { customersSchema } from '../schemas';


describe('customers reducer tests', () => {

  let customersState = {};
  let customersIdsState = [];
  let customerBrandsState = [];

  it('Should add loaded customers to empty state', () => {
    const newCustomers = [
      { id: 1, email: 'r@a.com', password: '123123', firstName: 'Rustem', lastName: 'I' },
      { id: 2, email: 'f@a.com', password: '123123', firstName: 'Fidus', lastName: 'Fain' },
    ];
    const normalizedCustomers = normalize(newCustomers, customersSchema);
    customersState = customersReducers.customers(
      customersState,
      customersActions.loadCustomersSuccess(normalizedCustomers)
    );
    expect(customersState).toEqual({
      1: { id: 1, email: 'r@a.com', password: '123123', firstName: 'Rustem', lastName: 'I' },
      2: { id: 2, email: 'f@a.com', password: '123123', firstName: 'Fidus', lastName: 'Fain' },
    });

    customersIdsState = customersReducers.customersIds(
      customersIdsState,
      customersActions.loadCustomersSuccess(normalizedCustomers)
    );
    expect(customersIdsState).toEqual([1, 2]);
  });

  it('Should create customerBrand', () => {
    let action = customersActions.createCustomerBrand({ customerId: 1, brandId: 11, points: 0, isFollowing: true });
    customerBrandsState = customersReducers.customerBrands(customerBrandsState, action);
    expect(customerBrandsState).toEqual([
      { customerId: 1, brandId: 11, points: 0, isFollowing: true },
    ]);
    action = customersActions.createCustomerBrand({ customerId: 1, brandId: 12, points: 0, isFollowing: true });
    customerBrandsState = customersReducers.customerBrands(customerBrandsState, action);
    expect(customerBrandsState).toEqual([
      { customerId: 1, brandId: 11, points: 0, isFollowing: true },
      { customerId: 1, brandId: 12, points: 0, isFollowing: true },
    ]);
  });

  it('Should update customerBrand', () => {
    const action = customersActions.updateCustomerBrand(1, 11, { isFollowing: false });
    customerBrandsState = customersReducers.customerBrands(customerBrandsState, action);
    expect(customerBrandsState).toEqual([
      { customerId: 1, brandId: 11, points: 0, isFollowing: false },
      { customerId: 1, brandId: 12, points: 0, isFollowing: true },
    ]);
  });

  it('Should update two customerBrands', () => {
    const action = customersActions.updateCustomerBrands([
      { customerId: 1, brandId: 11, points: 500, isFollowing: false },
      { customerId: 1, brandId: 12, points: 500, isFollowing: true },
    ]);
    customerBrandsState = customersReducers.customerBrands(customerBrandsState, action);
    expect(customerBrandsState).toEqual([
      { customerId: 1, brandId: 11, points: 500, isFollowing: false },
      { customerId: 1, brandId: 12, points: 500, isFollowing: true },
    ]);
  });

});
