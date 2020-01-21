import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function validate(formValues) {
  const errors = {};
  if (!formValues.username) {
    errors.username = 'Missing username';
  }
  if (!formValues.password) {
    errors.password = 'Missing password';
  }
  return Object.keys(errors).length > 0 ? errors : null;
}

function Login({ onSubmit, error }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = { username, password };
    const errors = validate(formValues);
    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      onSubmit(username, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField label="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        {errors.username ? <p>{errors.username}</p> : null}
      </div>
      <div>
        <TextField label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {errors.password ? <p>{errors.password}</p> : null}
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}

export default Login;
