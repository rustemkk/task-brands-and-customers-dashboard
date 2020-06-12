import { normalize } from 'normalizr';

import * as brandsActions from '../actions';
import * as brandsReducers from '../reducer';
import { brandsSchema } from '../schemas';


describe('brands reducer tests', () => {

  let brandsState = {};
  let brandsIdsState = [];

  it('Should add loaded brands to empty state', () => {
    const newBrands = [
      { id: 11, email: 'a@a.com', password: '123123', name: 'A', symbol: 'AAA', logo: '', points: 200 },
      { id: 12, email: 'b@a.com', password: '123123', name: 'B', symbol: 'BBB', logo: '', points: 250 },
      { id: 13, email: 'c@a.com', password: '123123', name: 'C', symbol: 'CCC', logo: '', points: 20 },
    ];
    const normalizedBrands = normalize(newBrands, brandsSchema);
    brandsState = brandsReducers.brands(
      brandsState,
      brandsActions.loadBrandsSuccess(normalizedBrands)
    );
    expect(brandsState).toEqual({
      11: { id: 11, email: 'a@a.com', password: '123123', name: 'A', symbol: 'AAA', logo: '', points: 200 },
      12: { id: 12, email: 'b@a.com', password: '123123', name: 'B', symbol: 'BBB', logo: '', points: 250 },
      13: { id: 13, email: 'c@a.com', password: '123123', name: 'C', symbol: 'CCC', logo: '', points: 20 },
    });

    brandsIdsState = brandsReducers.brandsIds(
      brandsIdsState,
      brandsActions.loadBrandsSuccess(normalizedBrands)
    );
    expect(brandsIdsState).toEqual([11, 12, 13]);
  });

});
