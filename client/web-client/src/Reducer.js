import { CONSTANTS } from './constants';
import { initialState } from './Store';
import moment from 'moment';

const {
  SET_USER,
  LOGOUT,
  TOGGLE_LOADING,
  SET_EXERCISES,
  REMOVE_EXERCISE,
  ADD_EXERCISE,
  LOAD_PUSH_UPS_DATA,
  FILTER_ALL,
  FILTER_CURRENT_MONTH,
  FILTER_CURRENT_WEEK,
  UPDATE_EXERCISE,
  SET_FILTER_BY_TYPE,
  TOGGLE_MENU,
  SET_ALL_USERS,
  SET_FILTERED_FRIENDS_RESULT,
  DECLINE_FRIEND_REQUEST,
  SET_FILTER_BY_DATE,
} = CONSTANTS;

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
        ...initialState,
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
        exercises: state.exercises.filter((exercise) => exercise.id !== action.payload.id),
        exerciseCount: state.exerciseCount - 1,
        loading: false,
      };
    case UPDATE_EXERCISE:
      // find index of exercise to update
      const exerciseIdx = state.exercises.map((ex) => ex.id).indexOf(action.payload.id);
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
        filteredExercises: state.exercises.filter((ex) => moment(ex.date).week() === currentWeek),
      };
    }
    case FILTER_CURRENT_MONTH: {
      const currentMonth = moment().format('MMMM');
      return {
        ...state,
        filteredExercises: state.exercises.filter((ex) => {
          return moment(ex.date).format('MMMM') === currentMonth;
        }),
      };
    }
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
    case SET_FILTER_BY_TYPE: {
      return {
        ...state,
        filterByType: action.payload,
      };
    }
    case LOAD_PUSH_UPS_DATA: {
      return {
        ...state,
        pushUpData: action.payload,
      };
    }
    case SET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload.users,
      };
    }
    case SET_FILTERED_FRIENDS_RESULT: {
      return {
        ...state,
        filteredFriendSearch: action.payload,
      };
    }
    case DECLINE_FRIEND_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          friendRequests: [...state.user.friendRequests.filter((req) => req !== action.payload)],
        },
      };
    }
    case SET_FILTER_BY_DATE: {
      return {
        ...state,
        filterByDate: action.payload,
      };
    }
    default:
      return state;
  }
};
