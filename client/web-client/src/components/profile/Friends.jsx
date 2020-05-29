import React, { useState, useContext } from 'react';
import { Debug } from '../Debug';
import { getAllUsers } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';

import PropTypes from 'prop-types';

//  propTypes = {
//   options: PropTypes.instanceOf(Array).isRequired
// };

const { SET_FRIEND_SEARCH_RESULT, SET_FILTERED_FRIENDS_RESULT } = CONSTANTS;
const styles = {
  friendSection: {
    position: 'relative',
  },
  friendCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3',
  },
  friendList: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: '100%',
  },
};

export const Friends = () => {
  const [state] = useContext(AuthContext);
  const { filteredFriendSearch } = state;
  return (
    <section className='profile__component' style={styles.friendSection}>
      <FriendSearch userList={filteredFriendSearch} />
      <ul style={styles.friendList}>
        <FriendList />
      </ul>
    </section>
  );
};

const FriendList = () => {
  const [state] = useContext(AuthContext);
  const { filteredFriendSearch: userList } = state;
  console.log('userList', userList);
  if (!userList) return null;
  return userList.map((friend) => {
    return (
      <li key={friend.id}>
        <div style={styles.friendCard}>
          <p>{friend.username}</p>
          <button>Add</button>
        </div>
      </li>
    );
  });
};

const FriendSearch = () => {
  const [state, dispatch] = React.useContext(AuthContext);
  const { allUsers } = state;
  const [searchValue, setSearchValue] = React.useState('');
  const [count, setCount] = React.useState(0);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (allUsers && value.length > 0) {
      const users = filterLoadedUsers(value);
      console.info(' filtered ->', users);
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: users });
    }
    if (value.length === 0) {
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: [] });
    }
  };

  const handleFocus = async (e) => {
    console.info(`I have been focused ${count} times`);
    setCount((prevVal) => prevVal + 1);
    // make call to api only if first focus
    if (count >= 1) return;
    const allUsers = await getAllUsers();
    dispatch({ type: SET_FRIEND_SEARCH_RESULT, payload: allUsers });
  };

  const filterLoadedUsers = (input) => {
    console.info(`Filtering ${allUsers.length} users => ${input}`);
    const userList = allUsers.filter((user) => {
      return user.email.includes(input);
    });
    return userList;
  };

  return (
    <div className='friends__search'>
      <p>Search for friends!</p>
      <input
        type='text'
        value={searchValue}
        onChange={(e) => handleChange(e)}
        onFocus={(e) => handleFocus(e)}
        autoComplete='off'
      />
    </div>
  );
};
