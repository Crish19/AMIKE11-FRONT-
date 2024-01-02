// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { authData } = useContext(AuthContext);

  return authData ? Component : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
