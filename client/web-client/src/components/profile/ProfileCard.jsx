import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Store';

export const ProfileCard = () => {
  const [{ user }] = useContext(AuthContext);
  const history = useHistory();
  const [weight] = useState(175);

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
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Weight: {weight}lbs</p>
      <div className='form-field unit-system'>
        <p>Units:</p>
        <label>
          Imperial
          <input type='radio' name='unit-system' id='unit-system' value='Imperial' />
        </label>
        <label>
          Metric
          <input type='radio' name='unit-system' id='unit-system' value='Metric' />
        </label>
      </div>
      <button className='profile__delete-account-btn btn' onClick={() => handleDeleteAccount()}>
        Delete Account
      </button>
    </div>
  );
};
