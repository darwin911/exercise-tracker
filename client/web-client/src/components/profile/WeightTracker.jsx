import React from 'react';

export const WeightTracker = () => {
  return (
    <section className='profile__component weight-tracker'>
      <header className='profile__component__header'>
        <h2>Weight Tracker</h2>
      </header>
      <article className='profile__component__body'>
        <h3>Weight Over Time</h3>
        <p>[insert chart]</p>
      </article>
      <footer className='profile__component__footer'>
        <p>Footer</p>
      </footer>
    </section>
  );
};
