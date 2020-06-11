import { uniqueId } from 'lodash';
import { normalize } from 'normalizr';
import { combineEpics } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import * as brandsActions from './actions';
import * as brandsConstants from './constants';
import { brandsSchema } from './schemas';


const brands = [
  { id: uniqueId(), email: 'roga@a.com', password: '123123', name: 'Roga', symbol: 'ROG', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0wmcwfhUOp_nw8EVcE2XzFx00lsVQm7SP_AIUTRR8Ozv3LTVt&usqp=CAU', points: 500 },
  { id: uniqueId(), email: 'kopyta@a.com', password: '123123', name: 'Kopyta', symbol: 'KOP', logo: 'https://www.absorbinecz.cz/data/pics/442_6561b2b5_hoof-oil_czech.jpg', points: 150 },
  { id: uniqueId(), email: 'waffles@a.com', password: '123123', name: 'Waffles', symbol: 'WFLS', logo: 'https://png.pngtree.com/png-vector/20190830/ourmid/pngtree-waffle-round-logo-design-inspiration-png-image_1716403.jpg', points: 800 },
  { id: uniqueId(), email: 'grooomster@a.com', password: '123123', name: 'Grooomster', symbol: 'GRO', logo: 'https://image.freepik.com/free-vector/brid-gradien-collection-logo-design_99536-187.jpg', points: 200 },
  { id: uniqueId(), email: 'tutu@a.com', password: '123123', name: 'Tutu', symbol: 'TUT', logo: 'https://logopond.com/logos/8fb695403a9b915387596f6c2d492416.png', points: 200 },
]

export const loadBrandsEpic = action$ =>
  action$
    .ofType(brandsConstants.LOAD_BRANDS_REQUEST)
    .pipe(
      mergeMap(async () => {
        const result = brands;
        const normalizedBrands = normalize(result, brandsSchema);
        return brandsActions.loadBrandsSuccess(normalizedBrands);
      })
    );

export const createBrandEpic = action$ =>
  action$
    .ofType(brandsConstants.CREATE_BRAND_REQUEST)
    .pipe(
      mergeMap(async ({ email, password, name, symbol, logo, points }) => {
        const brand = { id: uniqueId(), email, password, name, symbol, logo, points };
        const normalizedBrands = normalize([brand], brandsSchema);
        return brandsActions.loadBrandsSuccess(normalizedBrands);
      })
    );

export default combineEpics(
  loadBrandsEpic,
  createBrandEpic,
);
