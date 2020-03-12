import React from 'react';
import { EXERCISE_TYPES } from '../constants';

export const FilterExercises = ({ filter, setFilter }) => {
  const types = Object.values(EXERCISE_TYPES);
  return (
    <aside className='filter__wrapper'>
      <label htmlFor='filter'>Filter: </label>
      <select
        id='filter'
        className='filter'
        value={filter}
        onChange={e => setFilter(e.target.value)}>
        <option value='All'>All</option>
        {types.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </aside>
  );
};
