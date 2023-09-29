import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [websites, setWebsites] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    
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
        setUser(null);
        localStorage.removeItem("token");
      }
    }  

    if (token && !user) {
      fetchUser(token);
    }
  }, [])

  console.log(user, "user");

  const fetchWebSites = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/users/${user.id}/websites`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newWebSites = await response.json();
      console.log(newWebSites, "newwebsites");
      if (response.ok) {
        setWebsites(newWebSites);
      }
    } catch (error) {
      console.error(error, "protected route");
      setWebsites([]);
    }
  };

  const createWebSites = async (url) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API}/users/${user.id}/websites`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      await fetchWebSites();

    } catch (error) {
      console.error(error, "protected route");
      setWebsites([]);
    }
  };

  

  return (
    <AuthContext.Provider value={{ user, setUser, websites, setWebsites, createWebSites, fetchWebSites }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
