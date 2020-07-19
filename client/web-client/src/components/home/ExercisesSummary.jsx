import React from 'react';

export const ExercisesSummary = ({ minutes, count, miles, pushUps }) => {
  const hours = Number(minutes / 60).toFixed(1);
  const renderHours = minutes > 999;
  return (
    <div className='user-exercises__summary'>
      <p className='user-exercises__summary__total-mins'>
        {renderHours ? hours : minutes}{' '}
        <span>
          {renderHours ? 'Hour' : 'Min'}
          {minutes > 1 ? 's' : ''}
        </span>
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
