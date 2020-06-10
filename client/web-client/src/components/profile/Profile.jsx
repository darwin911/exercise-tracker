import React, { useContext } from 'react';
import { AuthContext } from '../../Store';
import { Route } from 'react-router-dom';
import { Loader } from '../Loader';
import { Header } from '../Header';
import { ProfileCard } from './ProfileCard';
import { ConfirmDeleteAccountModal } from './ConfirmDeleteAccountModal';
import { Friends } from './Friends';

export const Profile = ({ isOpen, setMenuOpen }) => {
  const [{ user }] = useContext(AuthContext);

  if (!user) return <Loader size={4} />;

  return (
    <>
      <main className='container'>
        <div className='profile wrapper'>
          <ProfileCard />
          <Friends />
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
