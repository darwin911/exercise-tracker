import axios from 'axios';

// const BASE_URL = `http://localhost:5000`;
// http://localhost:5000/api/auth/google/callback
const BASE_URL = `https://exercise-tracker-express.herokuapp.com`;

// Exercises

const getUserExercises = async (userId) => {
  try {
    const resp = await axios.get(`${BASE_URL}/exercises/${userId}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

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
    console.error(err);
    return err.response.data;
  }
};

const registerUser = async (data) => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/register`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
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
};
