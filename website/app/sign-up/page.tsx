'use client';
import React, { useState } from 'react';
import { registerUser } from '../../lib/signupServics'; 
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // For error handling
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = await registerUser(email, password); 
    if (result.success) {
      router.push('/home');
    } else {
      if (result.message === 'User already exists. Please log in.') {
        router.push('/'); 
      } else {
        setError(result.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-lg shadow-md text-foreground">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input  
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-border"
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
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-border"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account? <a href="/" className="text-indigo-600 hover:text-indigo-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
