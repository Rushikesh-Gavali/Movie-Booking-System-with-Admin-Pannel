import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      {token ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome, User</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {status === 'failed' && <ErrorMessage message={error} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="border rounded w-full py-2 px-3 text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3 text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
