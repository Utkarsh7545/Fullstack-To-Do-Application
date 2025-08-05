import React, { useState } from 'react';
import { registerUser } from '../api';

interface Props {
  onRegister: () => void;
}

export default function RegisterForm({ onRegister }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      onRegister();
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Register</h2>
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
      <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
