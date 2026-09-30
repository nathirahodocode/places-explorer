import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  selectAuthError,
  selectAuthStatus,
} from '../features/auth/authSlice';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const [username, setUsername] = useState('places');
  const [password, setPassword] = useState('changeit');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Places Explorer
        </h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue</p>

        <label className="block mb-3">
          <span className="text-sm text-gray-700">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        {error && <p className="text-red-500 text-sm mb-3">{String(error)}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Default: places / changeit
        </p>
      </form>
    </div>
  );
};