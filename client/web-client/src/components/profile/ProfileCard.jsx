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
      <header className='profile__component__header'>
        <h1 className='profile__component__header__title'> Profile</h1>
        <img
          src={`https://picsum.photos/${size}`}
          alt='img'
          style={{ minWidth: size, minHeight: size }}
        />
        <h3>{user.username}</h3>
      </header>
      <article className='profile__component__body'>
        <ProfileField field='name' />
        <div>
          <h4>Email</h4>
          <span>{user.email}</span>
        </div>
        <br />
        <ProfileField field='weight' />
        <ProfileUnitsField />
      </article>
      <footer className='profile__component__footer'>
        <button
          className='delete-account-btn'
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
