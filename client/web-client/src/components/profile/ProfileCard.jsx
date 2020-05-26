import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Store';
import { ProfileField } from './ProfileField';
import { ProfileUnitsField } from './ProfileUnitsField';

export const ProfileCard = () => {
  const [{ user }] = useContext(AuthContext);
  const history = useHistory();

  const handleDeleteAccount = async () => {
    history.push('/profile/' + user.id + '/delete');
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
      <ProfileField field='name' />
      <div>
        <strong>Email: </strong> <span>{user.email}</span>
      </div>
      <br />
      <ProfileField field='weight' />
      <ProfileUnitsField />
      <br />
      <button className='profile__delete-account-btn btn' onClick={() => handleDeleteAccount()}>
        Delete Account
      </button>
    </div>
  );
};
