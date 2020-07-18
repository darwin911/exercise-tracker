import React from 'react';

export const ExercisesSummary = ({ minutes, count, miles, pushUps }) => {
  return (
    <div className='user-exercises__summary'>
      <p className='user-exercises__summary__total-mins'>
        {minutes} <span>Min{minutes > 1 ? 's' : ''}</span>
      </p>
      <p className='user-exercises__summary__total-exercises'>
        {count} <span>Exercise{count > 1 ? 's' : ''}</span>
      </p>
      <p className='user-exercises__summary__total-miles'>
        {miles} <span>Mile{miles !== 1 ? 's' : ''}</span>
      </p>
      <p className='user-exercises__summary__total-pushups'>
        {pushUps} <span>Push-up{pushUps !== 1 ? 's' : ''}</span>
      </p>
    </div>
  );
};
