import React from 'react';
import { exerciseTypes } from '../constants';

export const FilterExercises = ({ filter, setFilter }) => {
  return (
    <div className='filter__container'>
      <label htmlFor='filter'>Filter: </label>
      <select
        id='filter'
        className='filter'
        value={filter}
        onChange={e => setFilter(e.target.value)}>
        <option value='All'>All</option>
        {exerciseTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
