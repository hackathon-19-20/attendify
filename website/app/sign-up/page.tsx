'use client';
import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Add your sign-up logic here, e.g., API request.
      // Navigate to home after successful sign-up.
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <a href="/" className="text-indigo-600 hover:text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;