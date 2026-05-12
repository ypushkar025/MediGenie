import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;