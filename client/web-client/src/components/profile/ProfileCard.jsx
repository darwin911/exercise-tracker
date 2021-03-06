import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../Store';
import { ProfileField, ProfileUnitsField, Avatar } from './index';

export const ProfileCard = () => {
  const [{ user }] = useContext(AppContext);
  const history = useHistory();
  const [isHovered, setHovered] = React.useState(false);

  const handleDeleteAccount = async () => {
    history.push('/profile/' + user.id + '/delete');
  };

  const className = 'profile__component';

  return (
    <section className={`${className} profile-card`}>
      <header className={`${className}__header`}>
        <h2 className={`${className}__header__title`}>Profile</h2>
        <Avatar name={user.username} className={className} />
        <h3 className={`${className}__username`}>{user.username}</h3>
      </header>
      <article className={`${className}__body`}>
        <ProfileField field='name' />
        <div>
          <h4>Email</h4>
          <span>{user.email}</span>
        </div>
        <ProfileField field='weight' />
        <ProfileUnitsField />
      </article>
      <footer className={`${className}__footer`}>
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
