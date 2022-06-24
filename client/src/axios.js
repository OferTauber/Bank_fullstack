import axios from 'axios';
const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ofer-bank-app.herokuapp.com'
    : 'http://localhost:5000';

export const login = async ({ email, password }) => {
  try {
    const user = await axios.get(URL + '/login', {
      headers: { email, password },
    });
    return user.data;
  } catch (e) {
    // console.warn(e);
    return e;
  }
};
