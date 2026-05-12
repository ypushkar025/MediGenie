import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    await login(formData);
    navigate('/'); // Redirect to home after login
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default Login;