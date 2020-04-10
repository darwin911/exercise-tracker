import React, { useState, useContext } from 'react';
import { deleteUser } from '../../helper';
import { useHistory } from 'react-router-dom';
import { CONSTANTS } from '../../constants';
import { AuthContext } from '../../Store';
const { LOGOUT } = CONSTANTS;

export const ProfileCard = () => {
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
