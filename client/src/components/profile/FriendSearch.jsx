import React, { useContext, useState } from 'react';
import { getAllUsers, sendFriendRequest } from '../../helper';

import { AppContext } from '../../Store';
import { Avatar } from './index';
import { CONSTANTS } from '../../constants';
import { toast } from 'react-toastify';

const { SET_FILTERED_FRIENDS_RESULT, SET_ALL_USERS } = CONSTANTS;

toast.configure();

export const FriendSearch = () => {
  const [state, dispatch] = useContext(AppContext);
  const { allUsers, user } = state;
  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (allUsers && value.length > 0) {
      const users = filterLoadedUsers(allUsers, value, user.id);
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: users });
    } else if (value.length < 1) {
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: [] });
    }
  };

  const handleFocus = async () => {
    setCount((prevVal) => prevVal + 1);
    if (count >= 1) return;
    const allUsers = await getAllUsers();
    dispatch({ type: SET_ALL_USERS, payload: allUsers });
  };

  const filterLoadedUsers = (users, input, userId) => {
    const { friendRequestsSent } = user;

    return users.filter((user) => {
      const hasBeenRequested = !friendRequestsSent.includes(user.id);
      return (
        user.email.includes(input) && user.id !== userId && hasBeenRequested
      );
    });
  };

  return (
    <div className='search-wrapper'>
      <h3 className='search-wrapper__heading'>Friend Lookup</h3>
      <input
        type='text'
        placeholder='user@mail.com'
        value={searchValue}
        onChange={(e) => handleChange(e)}
        onFocus={handleFocus}
        autoComplete='off'
      />
      <AutoCompleteUserList setSearchValue={setSearchValue} />
    </div>
  );
};

const AutoCompleteUserList = ({ setSearchValue }) => {
  const [{ filteredFriendSearch: userList }] = useContext(AppContext);

  if (!userList) return null;

  return (
    <ul className='auto-complete-list'>
      {userList.map((user) => (
        <AutoCompleteUserCard
          user={user}
          key={user.id}
          setValue={setSearchValue}
        />
      ))}
    </ul>
  );
};

const AutoCompleteUserCard = ({ user, setValue }) => {
  const [{ user: currentUser }, dispatch] = useContext(AppContext);

  const handleAddFriend = async (targetId) => {
    const resp = await sendFriendRequest(currentUser.id, { targetId });
    if (resp && !!resp.message) {
      toast.info(resp.message);
      setValue('');
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: [] });
    } else {
      toast.error(`Error: ${resp.error}`);
    }
  };

  return (
    <li>
      <div className='auto-complete-item'>
        <Avatar name={user.username} className={'auto-complete-item'} />
        <p className='auto-complete-item__username'>{user.username}</p>
        <button
          className='auto-complete-item__add'
          onClick={() => handleAddFriend(user.id)}>
          Add
        </button>
      </div>
    </li>
  );
};
