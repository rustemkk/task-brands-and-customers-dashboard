import { combineEpics } from 'redux-observable';
import { delay, mergeMap, tap } from 'rxjs/operators';

import * as brandsActions from 'modules/brands/actions';
import { selectBrandByEmail, selectBrandByEmailAndPassword } from 'modules/brands/selectors';
import * as customersActions from 'modules/customers/actions';
import { selectCustomerByEmail, selectCustomerByEmailAndPassword } from 'modules/customers/selectors';
import history from 'utils/history'

import * as usersActions from './actions';
import * as usersConstants from './constants';


export const logInEpic = (action$, state$) =>
  action$
    .ofType(usersConstants.LOGIN_REQUEST)
    .pipe(
      delay(300),
      mergeMap(async ({ email, password }) => {
        let role = 'customer';
        let user = selectCustomerByEmailAndPassword(email, password)(state$.value);
        if (!user) {
          role = 'brand';
          user = selectBrandByEmailAndPassword(email, password)(state$.value);
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
        const customer = selectCustomerByEmail(data.email)(state$.value);
        const brand = selectBrandByEmail(data.email)(state$.value);
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

export default combineEpics(
  logInEpic,
  signUpEpic,
);
