import React, { useContext } from 'react';
import { AuthContext } from '../../Store';
import { Loader } from '../Loader';
import { Header } from '../Header';

export const Profile = ({ isOpen, setMenuOpen }) => {
  const [{ user }] = useContext(AuthContext);
  if (!user) {
    return <Loader size={4} />;
  }
  return (
    <main className='container'>
      <Header isOpen={isOpen} setMenuOpen={setMenuOpen} />
      <div className='profile'>
        <h1>Profile</h1>
        <h3>{user.username}</h3>
        <h4>Id: {user.id}</h4>
        <img src='https://picsum.photos/100' alt='img' />
      </div>
    </main>
  );
};
