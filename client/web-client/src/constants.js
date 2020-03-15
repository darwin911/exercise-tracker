export const CONSTANTS = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  SET_USER: 'SET_USER',
  SET_EXERCISES: 'SET_EXERCISES',
  ADD_EXERCISE: 'ADD_EXERCISE',
  REMOVE_EXERCISE: 'REMOVE_EXERCISE',
  UPDATE_EXERCISE: 'UPDATE_EXERCISE',
  CLEAR_USER: 'CLEAR_USER',
  LOGOUT: 'LOGOUT',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  TOGGLE_MENU: 'TOGGLE_MENU',
  IMPERIAL: 'IMPERIAL',
  METRIC: 'METRIC',
  FILTER_ALL: 'FILTER_ALL',
  FILTER_CURRENT_WEEK: 'FILTER_CURRENT_WEEK',
  FILTER_CURRENT_MONTH: 'FILTER_CURRENT_MONTH',
  SET_FILTER: 'SET_FILTER',
  EXERCISE_TYPES: {
    GENERAL: 'General',
    RUN: 'Run',
    GYM: 'Gym',
    YOGA: 'Yoga',
    CYCLING: 'Cycling',
    ROCK_CLIMBING: 'Rock Climbing',
    SWIMMING: 'Swimming',
    TENNIS: 'Tennis',
  },
};

export const ACTIVITY_TYPES = {
  AEROBIC: {
    title: 'Aerobic',
    description:
      'Aerobic activities make you breathe harder and make your heart and blood vessels healthier. These include:',
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
      'Flexibility-enhancing activities ensure a good range of motion in the joints. Loss of flexibility can be a predisposing factor for physical issues, such as pain syndromes or balance disorders. Gender, age, and genetics may all influence range of motion. Flexibility exercises include:',
    exampleList: ['Stretching', 'Yoga', 'Tai Chi or Qi Gong', 'Pilates'],
  },
  MUSCLE_STRENGTHENING: {
    title: 'Muscle-strengthening',
    description:
      'Muscle-strengthening activities build up your strength. These activities work all the different parts of the body—legs, hips, back, chest, stomach, shoulders, and arms—and include:',
    exampleList: [
      'Heavy gardening (digging, shoveling)',
      'Lifting weights',
      'Push-ups on the floor or against the wall',
      'Sit-ups',
      'Working with resistance bands (long, wide rubber strips that stretch)',
      'Pilates',
    ],
  },
};
