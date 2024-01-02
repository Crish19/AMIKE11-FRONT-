import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthContext from '../context/AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error message
  const navigate = useNavigate(); // Initialize useNavigate
  const { setAuthData } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on new submission

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      setAuthData(data.token);
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.'); // Display error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-center text-blue-500 mb-4">Login to AMIKE Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
