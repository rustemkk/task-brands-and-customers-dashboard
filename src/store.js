import { throttle } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { loadState, saveState } from 'utils';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';


export default () => {

  const persistedState = loadState();
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(epicMiddleware)),
  );
  epicMiddleware.run(rootEpic);

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
}
