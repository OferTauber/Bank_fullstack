import { useState } from 'react';
import Login from './login';
import User from './account/user';

function App() {
  const [logedUser, setLogedUser] = useState({});

  const logOut = () => {
    setLogedUser({});
  };

  return (
    <>
      {!logedUser.password && <Login passUserToApp={setLogedUser} />}
      {logedUser.password && <User logedUser={logedUser} logout={logOut} />}
    </>
  );
}

export default App;
