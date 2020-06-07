import React from 'react';
import { FriendSearch } from './FriendSearch';
import { FriendList } from './FriendList';
import { FriendRequests } from './FriendRequests';

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
