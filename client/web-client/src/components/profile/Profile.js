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
  const size = 56;
  return (
    <>
      <Header isOpen={isOpen} setMenuOpen={setMenuOpen} />
      <main className='container'>
        <div className='profile'>
          <h1>Profile</h1>
          <div className='profile__card'>
            <h3>Username: {user.username}</h3>
            <img
              src={`https://picsum.photos/${size}`}
              alt='img'
              style={{ minWidth: size, minHeight: size }}
            />
            <p>Email: {user.email}</p>
            <p>Weight: {weight}lbs</p>
            {user.unitSystem && <p>Units: {user.unitSystem}</p>}
          </div>
        </div>
      </main>
    </>
  );
};
