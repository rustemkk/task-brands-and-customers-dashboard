import { combineEpics } from 'redux-observable';

import modules from './modules';


let epics = [];

modules.forEach(module => {
  if (module.epics) {
    epics = [...epics, module.epics];
  }
});

export default combineEpics(
  ...epics,
);
