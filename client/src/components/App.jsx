import { useState } from 'react';
import Request from './request';

function App() {
  const [returnVal, setReturnVal] = useState('');
  const requestsArr = [
    {
      name: 'Create new user',
      type: 'post',
      params: {
        json: {
          id: 'string',
          cash: 0,
          name: 'string',
        },
        query: {},
      },
      route: '/new_user',
    },
    {
      name: 'Get all users',
      type: 'get',
      params: {
        json: {},
        query: {},
      },
      route: '/all_users',
    },
    {
      name: 'Get user',
      type: 'put',
      params: {
        json: { user: 'string' },
        query: {},
      },
      route: '/user',
    },
    {
      name: 'Open account',
      type: 'put',
      params: {
        json: { user: 'text' },
        query: { cash: 0, credit: 0 },
      },
      route: '/new_account',
    },
    {
      name: 'Deposit',
      type: 'put',
      params: {
        json: { accountId: 'text' },
        query: { amount: 0 },
      },
      route: '/deposit',
    },
    {
      name: 'Update credit',
      type: 'put',
      params: {
        json: { accountId: 'text', credit: 0 },
        query: {},
      },
      route: '/update_credit',
    },
    {
      name: 'Withdraw',
      type: 'put',
      params: {
        json: { accountId: 'text', amount: 0 },
        query: {},
      },
      route: '/withdraw',
    },
    {
      name: 'Transfer',
      type: 'put',
      params: {
        json: { payer: 'text', payee: 'text', amount: 0 },
        query: {},
      },
      route: '/transfer',
    },
    {
      name: 'Account details',
      type: 'put',
      params: {
        json: { accaountId: 'text' },
        query: {},
      },
      route: '/accaount',
    },
    {
      name: 'User details',
      type: 'put',
      params: {
        json: { user: 'text' },
        query: {},
      },
      route: '/user',
    },
  ];

  const captureDataFromChild = (data) => {
    setReturnVal(JSON.stringify(data.data));
  };

  const mapUsers = () => {
    return requestsArr.map((req) => {
      return (
        <Request
          config={req}
          key={req.name}
          passDataToParent={captureDataFromChild}
        />
      );
    });
  };

  return (
    <div className="App">
      <br />
      <div className="ui container">
        <div className="ui raised segment sticky">
          <h3>Return value:</h3>
          <div>{returnVal}</div>
        </div>
        <br />
        <br />
        {mapUsers()}
      </div>
    </div>
  );
}

export default App;
