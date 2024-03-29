import { useState } from 'react';
import Notification from "./Notifications.jsx";

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    await handleLogin(username, password);
    setErrorMessage('Wrong username or password');
    setTimeout(() => {
      setErrorMessage(null); // Clear the error message after 5 seconds
    }, 5000);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification className="error" message={errorMessage}/>
      <form onSubmit={submit}>
        <div>
          Username
          <br></br>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <br></br>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;