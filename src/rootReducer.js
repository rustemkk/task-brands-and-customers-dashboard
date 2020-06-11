import { combineReducers } from 'redux';

import modules from './modules';


let reducers = {};

modules.forEach(module => {
  if (module.reducer) {
    reducers = { ...reducers, [module.name]: module.reducer };
  }
});

export default combineReducers(reducers);