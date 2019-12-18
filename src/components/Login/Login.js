import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login({ onSubmit, error }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <form>
      <div><TextField label="username" value={username} onChange={(e) => setUsername(e.target.value)}/></div>
      <div><TextField label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
      <div><Button onClick={() => onSubmit(username, password)}>Submit</Button></div>
      {error && <div>{error}</div>}
    </form>
  );
}

export default Login;
