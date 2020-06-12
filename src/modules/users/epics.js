import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { delay, mergeMap, tap } from 'rxjs/operators';

import * as brandsActions from 'modules/brands/actions';
import * as brandSelectors from 'modules/brands/selectors';
import * as customersActions from 'modules/customers/actions';
import * as customersSelectors from 'modules/customers/selectors';
import history from 'utils/history'

import * as usersActions from './actions';
import * as usersConstants from './constants';
import { selectCurrentUserId } from './selectors';


export const logInEpic = (action$, state$) =>
  action$
    .ofType(usersConstants.LOGIN_REQUEST)
    .pipe(
      delay(300),
      mergeMap(async ({ email, password }) => {
        let role = 'customer';
        let user = customersSelectors.selectCustomerByEmailAndPassword(email, password)(state$.value);
        if (!user) {
          role = 'brand';
          user = brandSelectors.selectBrandByEmailAndPassword(email, password)(state$.value);
        }
        if (user) {
          return usersActions.logInSuccess({ ...user, role });
        } else {
          return usersActions.setError('This combination of email and password is not found');
        }
      }),
    );

export const signUpEpic = (action$, state$) =>
  action$
    .ofType(usersConstants.SIGNUP_REQUEST)
    .pipe(
      delay(300),
      mergeMap(async ({ data }) => {
        const customer = customersSelectors.selectCustomerByEmail(data.email)(state$.value);
        const brand = brandSelectors.selectBrandByEmail(data.email)(state$.value);
        if (customer || brand) {
          return usersActions.setError('This email already exist on the platform');
        }
        if (data.role === 'customer') {
          return customersActions.createCustomer(data.email, data.password, data.firstName, data.lastName);
        } else {
          return brandsActions.createBrand(data.email, data.password, data.name, data.symbol, data.logo, data.points);
        }
      }),
      tap(action => action.type !== usersConstants.SET_ERROR && history.push('/log-in'))
    );

export const followBrandEpic = (action$, state$) =>
  action$
    .ofType(usersConstants.FOLLOW_BRAND_REQUEST)
    .pipe(
      mergeMap(async ({ brandId }) => {
        const currentUserId = selectCurrentUserId(state$.value);
        const customerBrands = customersSelectors.selectCustomerBrandsByCustomerId(currentUserId)(state$.value);
        const customerBrand = customerBrands.find(cb => cb.customerId === currentUserId && cb.brandId === brandId);
        if (!customerBrand) {
          return customersActions.createCustomerBrand({ customerId: currentUserId, brandId, points: 0, isFollowing: true });
        } else if (!customerBrand.isFollowing) {
          return customersActions.updateCustomerBrand(currentUserId, brandId, { isFollowing: true });
        }
        return { type: '' };
      }),
    );

export const unfollowBrandEpic = (action$, state$) =>
  action$
    .ofType(usersConstants.UNFOLLOW_BRAND_REQUEST)
    .pipe(
      mergeMap(async ({ brandId }) => {
        const currentUserId = selectCurrentUserId(state$.value);
        const customerBrands = customersSelectors.selectCustomerBrandsByCustomerId(currentUserId)(state$.value);
        const customerBrand = customerBrands.find(cb => cb.customerId === currentUserId && cb.brandId === brandId);
        if (customerBrand && customerBrand.isFollowing) {
          return customersActions.updateCustomerBrand(currentUserId, brandId, { isFollowing: false });
        }
        return { type: '' };
      }),
    );

export const givePointsEpic = (action$, state$) =>
  action$
    .ofType(usersConstants.GIVE_POINTS_REQUEST)
    .pipe(
      mergeMap(({ customerIds, points }) => {
        const currentUserId = selectCurrentUserId(state$.value);
        const customerBrands = customersSelectors.selectCustomerBrandsByBrandId(currentUserId)(state$.value);
        const newCustomerBrands = customerIds.map(customerId => {
          const customerBrand = customerBrands.find(cb => cb.customerId === customerId);
          return { ...customerBrand, points: customerBrand.points + points };
        });
        const brand = brandSelectors.selectBrandById(currentUserId)(state$.value);
        const brandPoints = brand.points - newCustomerBrands.length * points;
        return of(
          customersActions.updateCustomerBrands(newCustomerBrands),
          brandsActions.updateBrand(currentUserId, { points: brandPoints }),
          usersActions.updateCurrentUser({ points: brandPoints }),
        );
      }),
    );

export default combineEpics(
  logInEpic,
  signUpEpic,
  followBrandEpic,
  unfollowBrandEpic,
  givePointsEpic,
);
