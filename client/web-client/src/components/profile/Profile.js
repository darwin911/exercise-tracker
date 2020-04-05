import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Store';
import { Loader } from '../Loader';
import { Header } from '../Header';
import { deleteUser } from '../../helper';
import { useHistory } from 'react-router-dom';
import { CONSTANTS } from '../../constants';
const { LOGOUT } = CONSTANTS;

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

const ProfileCard = () => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const [weight] = useState(175);

  const handleDeleteAccount = async () => {
    // TODO Create Custom Confirmation Modal
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('This will delete all your account information. Continue?');
    if (confirmation) {
      await deleteUser(user.id);
      dispatch({ type: LOGOUT });
      history.push('/auth/login');
    }
  };

  const size = 48;
  return (
    <div className='profile__card'>
      <header className='profile__card__header'>
        <h3>{user.username}</h3>
        <img
          src={`https://picsum.photos/${size}`}
          alt='img'
          style={{ minWidth: size, minHeight: size }}
        />
      </header>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Weight: {weight}lbs</p>
      {user.unitSystem && <p>Units: {user.unitSystem}</p>}
      <button className='profile__delete-account-btn btn' onClick={() => handleDeleteAccount()}>
        Delete Account
      </button>
    </div>
  );
};
