import React, { useContext } from 'react';
import { ExercisesSummary, FilterExercises } from './index';
import { AddExerciseButton } from '../shared/index';
import { AppContext } from '../../Store';
import moment from 'moment';

export const Dashboard = ({ data }) => {
  const [{ user }] = useContext(AppContext);
  return (
    <>
      <aside className='dashboard'>
        <header className='dashboard__header'>
          <h2 className='dashboard__heading'>Dashboard</h2>
          <h3>Hi {user.username}!</h3>
          <h4>Today is {moment().format('dddd MMMM Do, yyyy')}</h4>
        </header>
        <ExercisesSummary username={user ? user.username : 'Guest'} {...data} />
        <div className='filter__container'>
          <FilterExercises />
          <AddExerciseButton />
        </div>
      </aside>
    </>
  );
};
