import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import WebsiteLinks from "./containers/WebsiteLinks";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/websites"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/websites/:websiteId"
            element={
              <ProtectedRoute>
                <WebsiteLinks />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/websites" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
