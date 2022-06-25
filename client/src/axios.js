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
    console.warn(e);
  }
};

export const getUserAccounts = async (user_id) => {
  try {
    const { data } = await axios.get(URL + '/all_acconts/' + user_id);
    return data;
  } catch (e) {
    console.warn(e);
  }
};

const deposit = async (id, amount) => {
  try {
    const resalt = await axios.put(URL + '/deposit', null, {
      params: {
        account_id: id,
        amount,
      },
    });
    console.log('deposit: ', resalt.data);

    return resalt;
  } catch (e) {
    console.warn(e);
  }
};

export const form_transactions = {
  Deposit: deposit,
  Withdraw: undefined,
  Credit: undefined,
};
