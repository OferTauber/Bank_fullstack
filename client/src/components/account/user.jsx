import NewAccount from './new_account';
import Account from './account';
import { useEffect, useState } from 'react';
import { getUserAccounts } from '../../axios';

const User = ({ logedUser, logout }) => {
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
          <div className=" header item btn" onClick={logout}>
            Log Out
          </div>
        </div>
      </div>
      <br />
      <br />
      <NewAccount userId={logedUser._id} reload={fetchUsersAccounts} />
      {mapUserAccounts()}
    </div>
  );
};

export default User;
