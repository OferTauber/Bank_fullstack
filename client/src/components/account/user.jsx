import NewAccount from './new_account';
import Account from './account';
import { useEffect, useState } from 'react';
import { getUserAccounts } from '../../axios';

const User = ({ logedUser }) => {
  const [userAccounts, setUserAccounts] = useState([]);

  const fetchUsersAccounts = async () => {
    const userAccountsFromAPI = await getUserAccounts(
      logedUser._id,
      logedUser.password
    );
    setUserAccounts(userAccountsFromAPI);
  };

  useEffect(() => {
    fetchUsersAccounts();
  }, []);

  const mapUserAccounts = () => {
    return userAccounts.map((account) => {
      return (
        <Account
          account={account}
          key={account._id}
          reload={fetchUsersAccounts}
        />
      );
    });
  };

  return (
    <div className="ui container ">
      <div className="ui fixed inverted menu">
        <div className="ui container ofer-nav">
          <div className="header item">Welcome {logedUser.name}</div>
          <div className=" header item btn">Log Out</div>
        </div>
      </div>
      <br />
      <br />
      <NewAccount />
      {mapUserAccounts()}
    </div>
  );
};

export default User;

// const account = {
//   _id: '62b592b9069fcc0cf3dfcfbf',
//   cash: 500,
//   credit: 0,
//   owner: '62b592b9069fcc0cf3dfcfbe',
//   __v: 0,
// };
