import { useState } from 'react';
import { login } from '../axios';

const Login = ({ passUserToApp }) => {
  const [spinner, setSpinner] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');

  const onInputLoginChange = (event) => {
    onInputChange(event, loginDetails, setLoginDetails);
  };

  const onInputSignUpChange = (event) => {
    onInputChange(event, signUp, setSignUp);
  };

  const onInputChange = (event, state, stateSetter) => {
    const filde = event.target.name;
    const value = event.target.value;

    const newState = { ...state };
    newState[filde] = value;

    stateSetter(newState);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    console.log('Login!');
    setSpinner(true);
    try {
      const user = await login(loginDetails);
      if (user.password) {
        await passUserToApp(user);
      } else {
        setLoginErrorMessage('Unable to log in');
      }
      setSpinner(false);
    } catch (e) {
      console.warn(e);
      setSpinner(false);
    }
  };

  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">Log-in to your account</div>
        </h2>
        <form
          className={`ui large form ${spinner && 'loading'}`}
          onSubmit={(e) => onLogin(e)}
        >
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  required
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={loginDetails.email}
                  onChange={(e) => onInputLoginChange(e)}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  required
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={loginDetails.password}
                  onChange={(e) => onInputLoginChange(e)}
                />
              </div>
            </div>
            <button className="ui fluid large teal submit button">Login</button>
            <div className="ui error masege">{loginErrorMessage}</div>
          </div>

          <div className="ui error message"></div>
        </form>

        <h2 className="ui teal image header">
          <div className="content">Dont have an account yet?</div>
        </h2>
        <form className={`ui large form ${spinner && 'loading'}`}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  required
                  type="text"
                  name="name"
                  value={signUp.name}
                  placeholder="Name"
                  onChange={(e) => onInputSignUpChange(e)}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="mail icon"></i>
                <input
                  required
                  type="email"
                  name="email"
                  value={signUp.email}
                  placeholder="Email"
                  onChange={(e) => onInputSignUpChange(e)}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>

                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="ui fluid large teal submit button">Sign-Up</div>
            <div className="ui error masege">{signUpErrorMessage}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
