import React, { createContext, useReducer } from 'react';
import { Reducer } from './Reducer';

export const initialState = {
  user: null,
  loading: false,
  exercises: [],
  filterByType: 'ALL',
  filterByDate: 'All Time',
  allUsers: [],
  filteredFriendSearch: [],
};

export const AppContext = createContext(initialState);

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};
