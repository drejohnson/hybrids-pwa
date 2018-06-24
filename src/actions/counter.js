export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = (value = 1) => ({
  type: INCREMENT,
  value
});

export const decrement = (value = 1) => ({
  type: DECREMENT,
  value
});
