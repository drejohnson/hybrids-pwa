import { UPDATE_PAGE } from '../actions/app';

const app = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};

export default app;
