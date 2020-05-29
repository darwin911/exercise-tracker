import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Store';
import { ProfileField } from './ProfileField';
import { ProfileUnitsField } from './ProfileUnitsField';

export const ProfileCard = () => {
  const [{ user }] = useContext(AuthContext);
  const history = useHistory();
  const [isHovered, setHovered] = React.useState(false);

  const handleDeleteAccount = async () => {
    history.push('/profile/' + user.id + '/delete');
  };

  const size = 48;

  return (
    <section className='profile__component'>
      <h1>Profile</h1>
      <header className='profile__component__header'>
        <h3>{user.username}</h3>
        <img
          src={`https://picsum.photos/${size}`}
          alt='img'
          style={{ minWidth: size, minHeight: size }}
        />
      </header>
      <article>
        <ProfileField field='name' />
        <div>
          <strong>Email: </strong> <span>{user.email}</span>
        </div>
        <ProfileField field='weight' />
        <ProfileUnitsField />
      </article>
      <footer className='profile__component__footer'>
        <button
          className='profile__delete-account-btn'
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleDeleteAccount()}>
          Delete Account
        </button>
        {isHovered && <span style={{ marginLeft: '1rem' }}>Are you sure?</span>}
      </footer>
    </section>
  );
};
