import axios from 'axios';

// const BASE_URL = `http://localhost:5000`;
const BASE_URL = `https://exercise-tracker-express.herokuapp.com`;

// Exercises

const getUserExercises = async userId => {
  try {
    const resp = await axios.get(`${BASE_URL}/exercises/${userId}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const addExercise = async data => {
  try {
    const resp = await axios.post(`${BASE_URL}/exercises/add`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteExercise = async id => {
  try {
    const resp = await axios.delete(`${BASE_URL}/exercises/${id}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

// Authentication

const loginUser = async data => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/login`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};

const registerUser = async data => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/register`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};

const verifyToken = async data => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/verify`, data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export { getUserExercises, addExercise, deleteExercise, loginUser, registerUser, verifyToken };
