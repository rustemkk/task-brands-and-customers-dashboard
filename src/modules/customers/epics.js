import { uniqueId } from 'lodash';
import { normalize } from 'normalizr';
import { combineEpics } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import * as customersActions from './actions';
import * as customersConstants from './constants';
import { customersSchema } from './schemas';


const customers = [
  { id: uniqueId(), email: 'rustem@a.com', password: '123123', firstName: 'Rustem', lastName: 'Islamuratov' },
  { id: uniqueId(), email: 'klava@a.com', password: '123123', firstName: 'Klava', lastName: 'Coocoo' },
  { id: uniqueId(), email: 'franz@a.com', password: '123123', firstName: 'Franz', lastName: 'Shein' },
];

export const loadCustomersEpic = action$ =>
  action$
    .ofType(customersConstants.LOAD_CUSTOMERS_REQUEST)
    .pipe(
      mergeMap(async () => {
        const result = customers;
        const normalizedCustomers = normalize(result, customersSchema);
        return customersActions.loadCustomersSuccess(normalizedCustomers);
      })
    );

export const createCustomerEpic = action$ =>
  action$
    .ofType(customersConstants.CREATE_CUSTOMER_REQUEST)
    .pipe(
      mergeMap(async ({ email, password, firstName, lastName }) => {
        const customer = { id: uniqueId(), email, password, firstName, lastName };
        const normalizedCustomers = normalize([customer], customersSchema);
        return customersActions.loadCustomersSuccess(normalizedCustomers);
      })
    );

export default combineEpics(
  loadCustomersEpic,
  createCustomerEpic,
);
