import axios from 'axios';

const getExercises = async () => {
  try {
    const resp = await axios.get('http://localhost:5000/exercises');
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export { getExercises };
