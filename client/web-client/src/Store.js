import React, { createContext, useReducer } from 'react';
import { Reducer } from './Reducer';

const initialState = {
  user: null,
  loading: false,
  exercises: [],
  exerciseCount: 0,
  exerciseMins: 0,
  totalMiles: 0,
  modalOpen: false,
};

export const AuthContext = createContext(initialState);

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};
