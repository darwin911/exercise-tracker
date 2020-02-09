import { SET_USER, CLEAR_USER, LOADING } from './constants';

export const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
