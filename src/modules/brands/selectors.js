import { get } from 'lodash';
import { createSelector } from 'reselect';


export const selectBrandsEntities = (state) =>
  get(state, 'brands.brands') || {};

export const selectBrandsIds = (state) =>
  get(state, 'brands.brandsIds') || [];

export const selectAllBrands = createSelector(
  selectBrandsEntities,
  selectBrandsIds,
  (brands, brandsIds) => brandsIds.map(id => brands[id]).sort((a, b) => a.name > b.name ? 1 : -1)
);

export const selectBrandById = (brandId) => createSelector(
  selectBrandsEntities,
  (brands) => brands[brandId]
);

export const selectBrandByEmail = (email) => createSelector(
  selectAllBrands,
  (brands) => brands.find(b => b.email === email)
);

export const selectBrandByEmailAndPassword = (email, password) => createSelector(
  selectAllBrands,
  (brands) => brands.find(b => b.email === email && b.password === password)
);
