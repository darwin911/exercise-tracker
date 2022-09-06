import axios from "axios";
const PORT = process.env.REACT_APP_API_PORT || 3001;
const isDevelopment = process.env.NODE_ENV === "development";
const BASE_URL = isDevelopment
  ? `http://localhost:${PORT}`
  : process.env.REACT_APP_API_URL;

/**
 *
 * @param {*} userId
 * @returns
 */
const getUserExercises = async (userId) => {
  try {
    const resp = await axios.get(`${BASE_URL}/exercises/${userId}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {Object} data
 * @returns
 */
const addExercise = async (data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/exercises/add`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteExercise = async (id) => {
  try {
    const resp = await axios.delete(`${BASE_URL}/exercises/${id}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const editExercise = async (id, data) => {
  try {
    const resp = await axios.put(`${BASE_URL}/exercises/update/${id}`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const getUserPushUpsData = async (userId) => {
  try {
    const resp = await axios.get(`${BASE_URL}/exercises/${userId}/push-ups/`);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

// Authentication

const loginUser = async (data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/login`, data);
    return resp.data;
  } catch (err) {
    return { error: err.toJSON().message };
  }
};

const registerUser = async (data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/register`, data);
    return resp.data;
  } catch (err) {
    return { error: err.toJSON().message };
  }
};

const verifyToken = async (data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/verify`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (id) => {
  try {
    const resp = await axios.delete(`${BASE_URL}/users/${id}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (id, data) => {
  try {
    const resp = await axios.put(`${BASE_URL}/users/${id}/update`, data);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (id) => {
  try {
    const resp = await axios.get(`${BASE_URL}/users/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/users`);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const getMultipleUsers = async (id, data) => {
  try {
    const resp = await axios.get(
      `${BASE_URL}/users/${id}/friend-requests`,
      data
    );
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const sendFriendRequest = async (id, data) => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/users/${id}/send-friend-request`,
      data
    );
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const acceptFriendRequest = async (id, data) => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/users/${id}/accept-friend`,
      data
    );
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const declineFriendRequest = async (id, targetId) => {
  try {
    const resp = await axios.delete(
      `${BASE_URL}/users/${id}/decline-friend/${targetId}`
    );
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const removeFriend = async (id, targetId) => {
  try {
    const resp = await axios.delete(
      `${BASE_URL}/users/${id}/remove-friend/${targetId}`
    );
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const getFriendsData = async (id, friendIds) => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/${id}/get-friends-data`, {
      friendIds,
    });
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  getUserExercises,
  getUserPushUpsData,
  addExercise,
  deleteExercise,
  editExercise,
  loginUser,
  registerUser,
  verifyToken,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  getMultipleUsers,
  getFriendsData,
};
