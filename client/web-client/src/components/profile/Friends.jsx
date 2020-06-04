import React, { useContext } from 'react';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { acceptFriendRequest, declineFriendRequest, removeFriend } from '../../helper';
import { FriendSearch } from './FriendSearch';

const { DECLINE_FRIEND_REQUEST, SET_USER } = CONSTANTS;

export const Friends = () => {
  const [state] = useContext(AuthContext);
  const { filteredFriendSearch } = state;

  return (
    <section className='profile__component friends'>
      <FriendRequests />
      <FriendSearch userList={filteredFriendSearch} />
    </section>
  );
};

const FriendRequests = () => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const { friendRequests, friends } = user;
  console.log(friendRequests);
  const friendRequestsPending = user.friendRequests ? user.friendRequests.length : 0;

  const handleAcceptFriendRequest = async (targetId) => {
    const updatedUser = await acceptFriendRequest(user.id, { targetId });
    dispatch({ type: SET_USER, payload: updatedUser });
  };

  const handleDeclineFriendRequest = async (targetId) => {
    const response = await declineFriendRequest(user.id, targetId);
    if (response.success) {
      dispatch({ type: DECLINE_FRIEND_REQUEST, payload: targetId });
      alert(response.message);
    }
  };

  const handleRemoveFriend = async (targetId) => {
    const response = await removeFriend(user.id, targetId);
    if (response && response.success) {
      dispatch({ type: SET_USER, payload: response.updatedUser });
      alert(response.message);
    }
  };

  const FriendRequests = () => {
    if (!friendRequests) return null;
    return (
      <div className='friend-requests'>
        {friendRequests.map((userId) => (
          <div className='friend-request' key={userId}>
            <p>Id: {userId}</p>
            <button onClick={() => handleAcceptFriendRequest(userId)}>Accept</button>
            <button onClick={() => handleDeclineFriendRequest(userId)}>Decline</button>
          </div>
        ))}
      </div>
    );
  };

  const FriendList = ({ friends }) => {
    const friendList =
      friends &&
      friends.map((friend) => (
        <div key={friend}>
          <p>{friend}</p>
          <button onClick={() => handleRemoveFriend(friend)}>Remove Friend</button>
        </div>
      ));

    return (
      <div className='friend-list'>
        <p>You have {friends ? friends.length : 0} friends</p>
        {friendList}
        <br />
      </div>
    );
  };

  return (
    <div>
      <p>You have {friendRequestsPending} friend requests</p>
      <br />
      <FriendRequests />
      <br />
      <FriendList friends={friends} />
    </div>
  );
};
