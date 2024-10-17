'use client';
import React, { useState } from 'react';
import { loginUser } from '../../lib/loginService';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const result = await loginUser(email, password);

      if (result.success) {
      
        localStorage.setItem('authToken', result.token); 
          console.log("suceess");
        router.push('/dashboard');
      } else {
        setError(result.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred during login.');
      return { success: false, message: 'Failed to log in. Please try again.' };
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-lg shadow-md text-foreground z-10">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
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
