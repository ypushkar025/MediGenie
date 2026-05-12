import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    await register(formData);
    navigate('/'); // Redirect to home after registration
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister} />;
};

export default Register;