import * as brandsConstants from './constants';


export const loadBrands = () => ({
  type: brandsConstants.LOAD_BRANDS_REQUEST,
});

export const loadBrandsSuccess = ({ entities: { brands }, result }) => ({
  type: brandsConstants.LOAD_BRANDS_SUCCESS,
  brands,
  brandsIds: result,
});

export const createBrand = (email, password, name, symbol, logo, points) => ({
  type: brandsConstants.CREATE_BRAND_REQUEST,
  email, 
  password, 
  name, 
  symbol, 
  logo,
  points,
});
