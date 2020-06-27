import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';

const data = [
  {
    weight: 100,
    day: 'Monday',
  },
  {
    weight: 110,
    day: 'Tuesday',
  },
  {
    weight: 115,
    day: 'Wednesday',
  },
];

export const WeightTracker = () => {
  return (
    <section className='profile__component weight-tracker'>
      <header className='profile__component__header'>
        <h2>Weight Tracker</h2>
      </header>
      <article className='profile__component__body'>
        <h3>Weight Over Time</h3>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey='day' />
          <YAxis />
          <CartesianGrid stroke='#eee' strokeDasharray='3 3' />
          <Line type='monotone' dataKey='weight' stroke='#8884d8' />
        </LineChart>
      </article>
      <footer className='profile__component__footer'>
        <p>Footer</p>
      </footer>
    </section>
  );
};
