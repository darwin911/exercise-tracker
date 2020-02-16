import React, { useState, useContext } from 'react';
import { FILTER_ALL, FILTER_CURRENT_MONTH, FILTER_CURRENT_WEEK } from '../constants';
import { AuthContext } from '../Store';

export const FilterExercises = () => {
  const [state, dispatch] = useContext(AuthContext);

  const [filterOption, setFilterOption] = useState('All');

  const handleChange = e => {
    const { value } = e.target;
    setFilterOption(value);
    console.log(value);
    dispatch({ type: value });
  };

  return (
    <select className='filter' value={filterOption} onChange={handleChange}>
      <option value={FILTER_ALL}>All</option>
      <option value={FILTER_CURRENT_WEEK}>This Week</option>
      <option value={FILTER_CURRENT_MONTH}>This Month</option>
    </select>
  );
};
