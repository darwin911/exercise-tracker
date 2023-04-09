import React from 'react';
import { FriendSearch, FriendList, FriendRequests } from './index';

export const Friends = () => {
  return (
    <section className='profile__component friends'>
      <h2>Friends</h2>
      <FriendList />
      <FriendRequests />
      <FriendSearch />
    </section>
  );
};
