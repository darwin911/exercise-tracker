import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Store';
import { Loader } from '../Loader';
import { Header } from '../Header';

export const Profile = ({ isOpen, setMenuOpen }) => {
  const [{ user }] = useContext(AuthContext);
  const [weight] = useState(175);
  if (!user) {
    return <Loader size={4} />;
  }
  return (
    <>
      <Header isOpen={isOpen} setMenuOpen={setMenuOpen} />
      <main className='container'>
        <div className='profile'>
          <h1>Profile</h1>
          <div className='profile__card'>
            <h3>{user.username}</h3>
            <h4>Id: {user.id}</h4>
            <img src='https://picsum.photos/100' alt='img' />
            <p>email: {user.email}</p>
            <p>weight: {weight}lbs</p>
          </div>
        </div>
      </main>
    </>
  );
};
