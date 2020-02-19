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
      let miles = action.payload
        .filter(exercise => exercise.distance)
        .reduce((acc, item) => acc + item.distance, 0);
      return {
        ...state,
        exercises: action.payload,
        exerciseCount: action.payload.length,
        exerciseMins: action.payload.reduce((total, exercise) => total + exercise.duration, 0),
        totalMiles: Math.round(miles * 100) / 100,
        loading: false,
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
        exerciseCount: state.exerciseCount + 1,
        exerciseMins: state.exerciseMins + action.payload.duration,
        totalMiles:
          action.payload.distance &&
          Math.round((state.totalMiles + action.payload.distance) * 100) / 100,
        loading: false,
      };
    case REMOVE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.payload.id),
        exerciseCount: state.exerciseCount - 1,
        exerciseMins: state.exerciseMins - action.payload.duration,
        totalMiles:
          action.payload.distance &&
          Math.round((state.totalMiles - action.payload.distance) * 100) / 100,
        loading: false,
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

    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    default:
      return state;
  }
};
