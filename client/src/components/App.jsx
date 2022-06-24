import { useState } from 'react';
import Login from './login';

function App() {
  const [logedUser, setLogedUser] = useState({});

  return (
    <div className="App">
      {!logedUser.password && <Login passUserToApp={setLogedUser} />}
    </div>
  );
}

export default App;
