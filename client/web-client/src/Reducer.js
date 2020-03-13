import {
  SET_USER,
  LOGOUT,
  TOGGLE_LOADING,
  SET_EXERCISES,
  REMOVE_EXERCISE,
  ADD_EXERCISE,
  TOGGLE_MODAL,
  FILTER_ALL,
  FILTER_CURRENT_MONTH,
  FILTER_CURRENT_WEEK,
  UPDATE_EXERCISE,
  SET_FILTER,
  TOGGLE_MENU,
} from './constants';
import moment from 'moment';

export const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        exercises: [],
        loading: false,
      };
    case SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        loading: false,
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
        loading: false,
      };
    case REMOVE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.payload.id),
        exerciseCount: state.exerciseCount - 1,
        loading: false,
      };
    case UPDATE_EXERCISE:
      // find index of exercise to update
      const exerciseIdx = state.exercises.map(ex => ex.id).indexOf(action.payload.id);
      const updatedExercise = action.payload;
      let updatedExercises = [...state.exercises];
      updatedExercises[exerciseIdx] = updatedExercise;
      return {
        ...state,
        exercises: updatedExercises,
      };
    case FILTER_ALL: {
      return {
        ...state,
        exercises: state.exercises,
        filteredExercises: null,
      };
    }
    case FILTER_CURRENT_WEEK: {
      const currentWeek = moment().week();
      return {
        ...state,
        filteredExercises: state.exercises.filter(ex => moment(ex.date).week() === currentWeek),
      };
    }
    case FILTER_CURRENT_MONTH: {
      const currentMonth = moment().format('MMMM');
      return {
        ...state,
        filteredExercises: state.exercises.filter(ex => {
          return moment(ex.date).format('MMMM') === currentMonth;
        }),
      };
    }
    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };

    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }

    default:
      return state;
  }
};
