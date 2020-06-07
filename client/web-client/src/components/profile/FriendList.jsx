import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Store';
import { removeFriend, getFriendsData } from '../../helper';
import { CONSTANTS } from '../../constants';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Avatar } from './Avatar';
const { SET_USER } = CONSTANTS;

toast.configure();

export const FriendList = ({ id }) => {
  const [{ user: currentUser }, dispatch] = useContext(AuthContext);
  const { friends } = currentUser;
  const [friendData, setFriendData] = useState([]);

  const handleRemoveFriend = async (targetId) => {
    console.info('handleRemoveFriend', targetId);
    const response = await removeFriend(currentUser.id, targetId);
    debugger;
    if (response && response.success) {
      dispatch({ type: SET_USER, payload: response.updatedUser });
      toast(response.message);
    }
  };

  useEffect(() => {
    const loadFriendsData = async (id, friendIds) => {
      const data = await getFriendsData(id, friendIds);
      setFriendData(data);
    };
    if (currentUser) {
      loadFriendsData(currentUser.id, friends);
    }
  }, [currentUser]);

  const FriendCard = ({ targetUser }) => {
    const className = 'friend-card';
    return (
      <div className={className}>
        <Avatar name={targetUser.username} className={className} />
        <p>{targetUser.username}</p>
        <button
          className={`${className}__delete-friend`}
          onClick={() => handleRemoveFriend(targetUser.id)}>
          &#10005;
        </button>
      </div>
    );
  };

  const FriendListHeader = () => (
    <h5 className='friend-list__header'>You have {friendData ? friendData.length : 0} friends</h5>
  );
  console.log('friendDAta', friendData);
  return (
    <div className='friend-list'>
      <FriendListHeader />
      {friendData.map((friend) => {
        console.log(friend);
        return <FriendCard key={friend.id} targetUser={friend} />;
      })}
    </div>
  );
};