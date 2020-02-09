import { SET_USER, CLEAR_USER } from './constants';

export const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};
