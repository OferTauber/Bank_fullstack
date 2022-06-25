import { useState } from 'react';
import Login from './login';
import User from './account/user';

function App() {
  const [logedUser, setLogedUser] = useState({});
  // const [logedUser, setLogedUser] = useState({
  //   accouts: ['62b5a8e91b77c2f8c83ff06b'],
  //   email: 'ofer@gmail.com',
  //   name: 'Ofer',
  //   password: '$2a$08$E.1jqhVWONH77Lc27farLO/EQ8bQOYQWskezEXD0r/2ALkfl/V2P.',
  //   __v: 0,
  //   _id: '62b5a8e91b77c2f8c83ff06a',
  // });

  return (
    <>
      {!logedUser.password && <Login passUserToApp={setLogedUser} />}
      {logedUser.password && <User logedUser={logedUser} />}
    </>
  );
}

export default App;
