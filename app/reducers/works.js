import { INITIALIZE_WORKS } from '../actions/initializeWorks';

function initializeWorks(state, action) {
  return action.works;
}

function works(state = [], action) {
  switch (action.type) {
    case INITIALIZE_WORKS:
      return initializeWorks(state, action);
    default:
      return state;
  }
}

export default works;
