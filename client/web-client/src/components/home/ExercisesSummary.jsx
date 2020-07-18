import React from 'react';

export const ExercisesSummary = ({ minutes, count, miles, pushUps }) => {
  return (
    <div className='user-exercises__summary'>
      <p className='user-exercises__summary__total-mins'>
        {minutes} <span>Mins</span>
      </p>
      <p className='user-exercises__summary__total-exercises'>
        {count} <span>Exercises</span>
      </p>
      <p className='user-exercises__summary__total-miles'>
        {miles} <span>Miles</span>
      </p>
      <p className='user-exercises__summary__total-pushups'>
        {pushUps} <span>Push-ups</span>
      </p>
    </div>
  );
};
