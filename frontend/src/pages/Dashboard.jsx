import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Profile from '../components/Profile';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <h1>Welcome back, {user.username}!</h1>
      <Profile />
      {/* Other dashboard content can go here */}
    </div>
  );
};

export default Dashboard;