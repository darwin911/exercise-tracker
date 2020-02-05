import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const getExercises = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/exercises`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteExercise = async id => {
  try {
    const resp = axios.delete(`${BASE_URL}/exercises/${id}`);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export { getExercises, deleteExercise };
