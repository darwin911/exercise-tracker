export const CONSTANTS = {
  ADD_EXERCISE: 'ADD_EXERCISE',
  CLEAR_USER: 'CLEAR_USER',
  DECLINE_FRIEND_REQUEST: 'DECLINE_FRIEND_REQUEST',
  FILTER_ALL: 'FILTER_ALL',
  FILTER_CURRENT_WEEK: 'FILTER_CURRENT_WEEK',
  FILTER_CURRENT_MONTH: 'FILTER_CURRENT_MONTH',
  LOGIN: 'LOGIN',
  LOAD_PUSH_UPS_DATA: 'LOAD_PUSH_UPS_DATA',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  SET_USER: 'SET_USER',
  SET_EXERCISES: 'SET_EXERCISES',
  SET_FILTER: 'SET_FILTER',
  SET_ALL_USERS: 'SET_ALL_USERS',
  SET_FILTERED_FRIENDS_RESULT: 'SET_FILTERED_FRIENDS_RESULT',
  REMOVE_EXERCISE: 'REMOVE_EXERCISE',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  TOGGLE_MENU: 'TOGGLE_MENU',
  UPDATE_EXERCISE: 'UPDATE_EXERCISE',
  UNITS: {
    IMPERIAL: 'IMPERIAL',
    METRIC: 'METRIC',
  },
};

export const EXERCISE_TYPES = {
  GENERAL: 'General',
  RUN: 'Run',
  GYM: 'Gym',
  YOGA: 'Yoga',
  CYCLING: 'Cycling',
  ROCK_CLIMBING: 'Rock Climbing',
  SWIMMING: 'Swimming',
  TENNIS: 'Tennis',
  PUSH_UPS: 'Push-Ups',
};

export const ACTIVITY_TYPES = {
  AEROBIC: {
    title: 'Aerobic',
    description:
      'Aerobic activities make you breathe harder and make your heart and blood vessels healthier.',
    exampleList: [
      'Walking',
      'Dancing',
      'Swimming',
      'Water aerobics',
      'Jogging and running',
      'Aerobic exercise classes',
      'Bicycle riding (stationary or on a path)',
      'Tennis',
      'Golfing (without a cart)',
    ],
  },
  FLEXIBILITY: {
    title: 'Flexibility',
    description:
      'These activities ensure a good range of motion in the joints. Gender, age, and genetics may all influence range of motion.',
    exampleList: ['Stretching', 'Yoga', 'Tai Chi or Qi Gong', 'Pilates'],
  },
  STRENGTH: {
    title: 'Strength Training',
    description:
      'They build up your strength, and work all the different parts of the body—legs, hips, back, chest, stomach, shoulders, and arms.',
    exampleList: [
      'Heavy gardening (digging, shoveling)',
      'Lifting weights',
      'Push-ups on the floor or against the wall',
      'Sit-ups',
      'Working with resistance bands (long, wide rubber strips that stretch)',
    ],
  },
};

export const TRANSITIONS = {
  SPRING: { type: 'spring', damping: 50, stiffness: 600 },
};

export const COLORS = {
  PRIMARY: '#a64eff',
};
