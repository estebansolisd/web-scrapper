import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const Logout = () => {
  const { setUser } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    history.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;