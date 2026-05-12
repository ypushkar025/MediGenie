import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AuthForm = ({ isLogin }) => {
  const { register, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const { email, password, username } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (isLogin) {
      await login({ email, password });
    } else {
      await register({ email, password, username });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {!isLogin && (
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
      )}
      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
      </div>
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;