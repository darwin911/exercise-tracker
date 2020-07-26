import React, { useContext } from 'react';
import { ACTIVITY_TYPES, EXERCISE_TYPES, CONSTANTS } from '../../constants';
import { AppContext } from '../../Store';
const { SET_FILTER_BY_TYPE, SET_FILTER_BY_DATE } = CONSTANTS;
const activityTypes = Object.values(ACTIVITY_TYPES).map((type) => type.title);
const exerciseTypeValues = Object.values(EXERCISE_TYPES);

export const FilterExercises = () => {
  const [{ filterByType, filterByDate }, dispatch] = useContext(AppContext);

  const handleSetFilterByType = (e) => {
    const inputValueFilter = e.target.value;
    dispatch({ type: SET_FILTER_BY_TYPE, payload: inputValueFilter });
  };

  const handleSetFilterByDate = (e) => {
    const inputValueFilter = e.target.value;
    dispatch({ type: SET_FILTER_BY_DATE, payload: inputValueFilter });
  };

  const FilterByType = () => (
    <div>
      <label htmlFor='filter-by-type'>Filter: </label>
      <select
        id='filter-by-type'
        className='filter-by-type'
        value={filterByType}
        onChange={(e) => handleSetFilterByType(e)}>
        <option value='ALL'>All Exercises</option>
        <option disabled>--------</option>
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        <option disabled>--------</option>
        {exerciseTypeValues.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );

  const FilterByDate = () => (
    <div>
      <label htmlFor='filter-by-date'>Date: </label>
      <select
        id='filter-by-date'
        className='filter-by-date'
        value={filterByDate}
        onChange={(e) => handleSetFilterByDate(e)}>
        <option value='All Time'>All Time</option>
        <option disabled>--------</option>
        {['Last 30 Days', 'Last 7 Days', 'Last 3 Days', 'Yesterday', 'Today'].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <aside className='filter__wrapper'>
      <FilterByType />
      <FilterByDate />
    </aside>
  );
};
