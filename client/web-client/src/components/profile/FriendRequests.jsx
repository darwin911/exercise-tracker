import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { acceptFriendRequest, declineFriendRequest, getMultipleUsers } from '../../helper';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const { SET_USER, DECLINE_FRIEND_REQUEST } = CONSTANTS;

toast.configure();

export const FriendRequests = () => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const { friendRequests } = user;

  const [friendRequestData, setFriendRequestData] = React.useState([]);

  const pendingFriendRequests = user.friendRequests ? user.friendRequests.length : 0;

  const handleAcceptFriendRequest = async (targetId) => {
    const updatedUser = await acceptFriendRequest(user.id, { targetId });
    dispatch({ type: SET_USER, payload: updatedUser });
    toast.success("You've added a new friend!");
  };

  const handleDeclineFriendRequest = async (targetId) => {
    const response = await declineFriendRequest(user.id, targetId);
    if (response.success) {
      dispatch({ type: DECLINE_FRIEND_REQUEST, payload: targetId });
      toast(response.message);
    }
  };

  useEffect(() => {
    const getFriendRequestData = async (id, requests) => {
      const friendRequestUserData = await getMultipleUsers(id, requests);
      console.log('usersData', friendRequestUserData);
      setFriendRequestData(friendRequestUserData);
    };

    friendRequests.length > 0
      ? getFriendRequestData(user.id, friendRequests)
      : setFriendRequestData([]);
  }, [friendRequests, user]);

  if (!friendRequests) return null;

  const FriendRequestHeader = () => <h5>You have {pendingFriendRequests} friend requests</h5>;

  return (
    <div className='friend-requests'>
      <h3>Friend Requests</h3>
      <FriendRequestHeader />
      <br />
      {friendRequestData.map((user) => (
        <div className='friend-request' key={user.id}>
          <div className='friend-request__data'>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
          <div className='friend-request__buttons'>
            <button style={{ color: 'green' }} onClick={() => handleAcceptFriendRequest(user.id)}>
              &#10003;
            </button>
            <button style={{ color: 'red' }} onClick={() => handleDeclineFriendRequest(user.id)}>
              &#10005;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
