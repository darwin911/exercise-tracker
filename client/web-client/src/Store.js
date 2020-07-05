import React, { createContext, useReducer } from 'react';
import { Reducer } from './Reducer';

const initialState = {
  user: null,
  loading: false,
  exercises: [],
  filterByType: 'ALL',
  filterByDate: 'All Time',
  allUsers: [],
  filteredFriendSearch: [],
};

export const AuthContext = createContext(initialState);

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};
