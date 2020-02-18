import React from 'react';
import { FilterExercises } from './FilterExercises';

export const ExercisesSummary = ({ username, totalExercises, totalExerciseMins, totalMiles }) => {
  return (
    <div className='user-exercises__summary'>
      <h4 className='user-exercises__summary__heading'>{username}'s Exercises</h4>
      <p className='user-exercises__summary__total-mins'>
        {totalExerciseMins} <span>Mins</span>
      </p>
      <p className='user-exercises__summary__total-exercises'>
        {totalExercises} <span>Exercises</span>
      </p>
      <p className='user-exercises__summary__total-miles'>
        {totalMiles} <span>Miles</span>
      </p>
      <FilterExercises />
    </div>
  );
};
