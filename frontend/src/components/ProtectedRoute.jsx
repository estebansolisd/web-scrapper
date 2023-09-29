import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login"  />;
  }
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchUser = async (token) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/me`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const { user } = await response.json();
  
        if (response.ok) {
          setUser(user);
        } 
      } catch (error) {
        console.error(error, "protected route");
        setUser(null);
        localStorage.removeItem("token");
      }
    }  

    if (token && !user) {
      fetchUser(token);
    }
  }, [])

  console.log(user, "user");

  return children;
};

export default ProtectedRoute;