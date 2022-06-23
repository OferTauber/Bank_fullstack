import axios from 'axios';
const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ofer-bank-app.herokuapp.com'
    : 'http://localhost:5000';

const sendReqwest = async (type, route, params) => {
  try {
    return await axios({
      method: type,
      url: URL + route,
      params: params.params,
      data: params.json,
      timeout: 3000,
    });
  } catch (err) {
    console.warn(err);
  }
};

export default sendReqwest;
