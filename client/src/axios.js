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

    return resalt;
  } catch (e) {
    console.warn(e);
  }
};

const withdraw = async (id, amount) => {
  try {
    const resalt = await axios.patch(URL + '/withdraw', null, {
      params: {
        account_id: id,
        amount,
      },
    });

    return resalt;
  } catch (e) {
    console.warn(e);
  }
};

const transfer = async (id_from, id_to, amount) => {
  try {
    const resalt = await axios.patch(URL + '/transfer', null, {
      params: {
        account_id_from: id_from,
        account_id_to: id_to,
        amount,
      },
    });

    return resalt;
  } catch (e) {
    console.warn(e);
  }
};

export const form_transactions = {
  Deposit: deposit,
  Withdraw: withdraw,
  Transfer: transfer,
};

//? headers: user_id
//? body: cash, credit
export const newAccaount = async (user_id, cash, credit) => {
  try {
    const resalt = await axios.post(
      URL + '/new_accaount',
      {
        cash,
        credit,
      },
      {
        headers: {
          _id: user_id,
        },
      }
    );

    return resalt;
  } catch (e) {
    console.warn(e);
  }
};
