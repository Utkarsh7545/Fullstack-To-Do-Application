import React, { useState } from 'react';
import { loginUser } from '../api';

interface Props {
  onLogin: (token: string) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(username, password);
      onLogin(token);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full p-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
