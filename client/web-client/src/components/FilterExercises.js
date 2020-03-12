import React from 'react';
import { EXERCISE_TYPES } from '../constants';
import { AuthContext } from '../Store';

const types = Object.values(EXERCISE_TYPES);

//{ filter, setFilter }
export const FilterExercises = () => {
  const [{ filter }, dispatch] = React.useContext(AuthContext);
  const handleSetFilter = e => {
    const inputValueFilter = e.target.value;
    dispatch({ type: 'SET_FILTER', payload: inputValueFilter });
  };
  return (
    <aside className='filter__wrapper'>
      <label htmlFor='filter'>Filter: </label>
      <select id='filter' className='filter' value={filter} onChange={e => handleSetFilter(e)}>
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
