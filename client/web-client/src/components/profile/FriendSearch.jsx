import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { getAllUsers, sendFriendRequest } from '../../helper';

const { SET_FILTERED_FRIENDS_RESULT, SET_FRIEND_SEARCH_RESULT } = CONSTANTS;

export const FriendSearch = () => {
  const [{ allUsers, user }, dispatch] = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (allUsers && value.length > 0) {
      const users = filterLoadedUsers(allUsers, value, user.id);
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: users });
    } else if (value.length === 0) {
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: [] });
    }
  };

  const handleFocus = async (e) => {
    setCount((prevVal) => prevVal + 1);
    if (count >= 1) return;
    const allUsers = await getAllUsers();
    dispatch({ type: SET_FRIEND_SEARCH_RESULT, payload: allUsers });
  };

  return (
    <div className='search-wrapper'>
      <h4>Friend Lookup</h4>
      <input
        type='text'
        placeholder='user@mail.com'
        value={searchValue}
        onChange={(e) => handleChange(e)}
        onFocus={(e) => handleFocus(e)}
        autoComplete='off'
      />
      <AutoCompleteUserList setSearchValue={setSearchValue} />
    </div>
  );
};

const filterLoadedUsers = (users, input, userId) => {
  return users.filter((user) => user.email.includes(input) && user.id !== userId);
};

const AutoCompleteUserList = ({ setSearchValue }) => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const [{ filteredFriendSearch: userList }] = useContext(AuthContext);

  if (!userList) return null;

  const handleAddFriend = async (targetId) => {
    const resp = await sendFriendRequest(user.id, { targetId });
    if (resp && resp.success) {
      alert(resp.message);
      setSearchValue('');
      dispatch({ type: SET_FILTERED_FRIENDS_RESULT, payload: [] });
    }
  };

  return (
    <ul className='auto-complete-list'>
      {userList.map((user) => {
        return (
          <li key={user.id}>
            <div className='auto-complete-item'>
              <div className='auto-complete-item__avatar'>
                <p className='auto-complete-item__initials'>
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.username.charAt(0).toUpperCase()}
                </p>
              </div>
              <p className='auto-complete-item__username'>{user.username}</p>
              <p className='auto-complete-item__email'>{user.email.slice(0, 20)}</p>
              <button className='auto-complete-item__add' onClick={() => handleAddFriend(user.id)}>
                Add
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
