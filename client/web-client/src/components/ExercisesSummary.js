import React from 'react';

export const ExercisesSummary = ({
  username,
  totalExercises,
  totalExerciseMins
}) => {
  return (
    <div className='user-exercises__summary'>
      <h4 className='user-exercises__summary__heading'>
        {username}'s Exercises
      </h4>
      <p className='user-exercises__summary__total-exercises'>
        {totalExercises} <span>Exercises</span>
      </p>
      <p className='user-exercises__summary__total-mins'>
        {totalExerciseMins} <span>Mins</span>
      </p>
    </div>
  );
};
