'use client';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here, e.g., API request.
    // Navigate to the home page after login.
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-lg shadow-md text-foreground">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg bg-mute focus:ring-indigo-500 focus:border-indigo-500 border-border"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-border"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;