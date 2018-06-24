import { html, define } from 'hybrids';
import { increment, decrement } from '../actions/counter';
import connect from '../connect';
import { store } from '../store';
import counter from '../reducers/counter';

import { ButtonSharedStyles } from './button-shared-styles.js';

store.addReducers({
  counter
});

const onInc = () => store.dispatch(increment());
const onDec = () => store.dispatch(decrement());

const SimpleCounter = {
  count: connect(
    store,
    state => {
      return state.counter.count;
    }
  ),
  render: ({ count, greeting }) => html`
    <style>:host { display: block; }</style>
    ${ButtonSharedStyles}
    <p>Count: ${count}</p>
    <button onclick="${onInc}">+increment</button>
    <button onclick="${onDec}">-decrement</button>
  `
};

define('simple-counter', SimpleCounter);
