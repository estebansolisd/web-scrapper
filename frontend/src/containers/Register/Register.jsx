import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const { user, token } = await response.json();


      if (response.ok) {
        setUser(user);
        localStorage.setItem("token", token);
        alert('Registration successful!');
        navigate("/")
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error, "error");
      alert('Error:', JSON.stringify(error));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h1>Register</h1>
        <input
          required
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" type="submit">
          Register
        </button>
        <Link to="/login" className="login-go-button">Already registered ? Go to login</Link>
      </form>
    </div>
  );
};

export default Register;