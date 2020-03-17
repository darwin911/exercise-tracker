import React from 'react';
import { ACTIVITY_TYPES, EXERCISE_TYPES } from '../constants';
import { AuthContext } from '../Store';

const activityTypes = Object.values(ACTIVITY_TYPES).map(type => type.title);
const exerciseTypeValues = Object.values(EXERCISE_TYPES);

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
        <option value='ALL'>All Exercises</option>
        <option disabled>--------</option>
        {activityTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        <option disabled>--------</option>
        {exerciseTypeValues.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        <option value=''></option>
      </select>
    </aside>
  );
};
