import * as customersSelectors from '../selectors';


describe('episodes selectors tests', () => {

  const mockedState = {
    customers: {
      customers: {
        1: { id: 1, email: 'a@a.com' },
        2: { id: 2, email: 'b@a.com' },
        3: { id: 3, email: 'c@a.com' },
        4: { id: 4, email: 'd@a.com' },
        5: { id: 5, email: 'e@a.com' },
      },
      customersIds: [1, 2, 3, 4, 5],
      customerBrands: [
        { customerId: 1, brandId: 11, points: 120, isFollowing: true },
        { customerId: 2, brandId: 11, points: 530, isFollowing: false },
        { customerId: 1, brandId: 12, points: 150, isFollowing: false },
      ]
    }
  };

  it('Should select all customers', () => {
    expect(customersSelectors.selectAllCustomers(mockedState)).toEqual([
      { id: 1, email: 'a@a.com' },
      { id: 2, email: 'b@a.com' },
      { id: 3, email: 'c@a.com' },
      { id: 4, email: 'd@a.com' },
      { id: 5, email: 'e@a.com' },
    ]);
  });

  it('Should select customers by id', () => {
    expect(customersSelectors.selectCustomerById(2)(mockedState)).toEqual({ id: 2, email: 'b@a.com' });
    expect(customersSelectors.selectCustomerById(5)(mockedState)).toEqual({ id: 5, email: 'e@a.com' });
  });

  it('Should select customer by email', () => {
    expect(customersSelectors.selectCustomerByEmail('a@a.com')(mockedState)).toEqual({ id: 1, email: 'a@a.com' });
  });

  it('Should not select customer by email', () => {
    expect(customersSelectors.selectCustomerByEmail('x@a.com')(mockedState)).toEqual(undefined);
  });

  it('Should select customerBrands by brandId', () => {
    expect(customersSelectors.selectCustomerBrandsByBrandId(11)(mockedState)).toEqual([
      { customerId: 1, brandId: 11, points: 120, isFollowing: true },
      { customerId: 2, brandId: 11, points: 530, isFollowing: false },
    ]);
  });

  it('Should select customerBrands by customerId', () => {
    expect(customersSelectors.selectCustomerBrandsByCustomerId(2)(mockedState)).toEqual([
      { customerId: 2, brandId: 11, points: 530, isFollowing: false },
    ]);
  });

});
