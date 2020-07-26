import React, { useContext } from 'react';
import { AppContext } from '../../Store';
import { Route } from 'react-router-dom';
import { Loader } from '../shared/index';
import { ProfileCard, ConfirmDeleteAccountModal, Friends, WeightTracker } from './index';

export const Profile = () => {
  const [{ user }] = useContext(AppContext);

  if (!user) return <Loader size={4} />;

  return (
    <>
      <main className='container'>
        <div className='profile wrapper'>
          <ProfileCard />
          <Friends />
          <WeightTracker />
        </div>
        <Route
          path='/profile/:id/delete'
          render={({ match }) => {
            const { id } = match.params;
            return <ConfirmDeleteAccountModal userId={id} />;
          }}
        />
      </main>
    </>
  );
};
