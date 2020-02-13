import {
  SET_USER,
  LOGOUT,
  TOGGLE_LOADING,
  SET_EXERCISES,
  REMOVE_EXERCISE,
  ADD_EXERCISE,
  TOGGLE_MODAL
} from './constants';

export const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        exercises: [],
        loading: false
      };
    case SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        loading: false
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
        loading: false
      };
    case REMOVE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          exercise => exercise._id !== action.payload
        ),
        loading: false
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen
      };

    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };

    default:
      return state;
  }
};
