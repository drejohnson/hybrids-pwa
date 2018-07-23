import { installRouter } from 'pwa-helpers/router.js';
import { navigate } from './actions/app';

export default (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (host, key, invalidate) => {
    installRouter(location =>
      store.dispatch(navigate(window.decodeURIComponent(location.pathname)))
    );
    return store.subscribe(invalidate);
  }
});
