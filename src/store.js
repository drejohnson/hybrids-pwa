import {
  createStore,
  compose as origCompose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';

import app from './reducers/app';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const store = createStore(
  (state, action) => state,
  compose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk)
  )
);

store.addReducers({
  app
});
