import {
  SET_USER,
  LOGOUT,
  LOADING,
  SET_EXERCISES,
  REMOVE_EXERCISE,
  ADD_EXERCISE
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
        loading: true
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case REMOVE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          exercise => exercise._id !== action.payload
        )
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
