import { configureStore } from 'redux-starter-kit'
import reducer from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const preloadedState = loadState();

const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(throttle(() => {
  saveState({
    authentication: store.getState().authentication
  });
}, 1000));

export default store;