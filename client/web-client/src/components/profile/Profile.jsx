import React, { useContext } from 'react';
import { AuthContext } from '../../Store';
import { Loader } from '../Loader';
import { Header } from '../Header';
import { ProfileCard } from './ProfileCard';

export const Profile = ({ isOpen, setMenuOpen }) => {
  const [{ user }] = useContext(AuthContext);

  if (!user) return <Loader size={4} />;

  return (
    <>
      <Header isOpen={isOpen} setMenuOpen={setMenuOpen} />
      <main className='container'>
        <div className='profile'>
          <h1>Profile</h1>
          <ProfileCard />
        </div>
      </main>
    </>
  );
};
