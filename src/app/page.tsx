'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './api/auth';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/protected/weather');
    } catch (err) {
      setError('Invalid email or password');
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
  <form
    onSubmit={handleLogin}
    className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-800"
  >
    <h2 className="text-3xl font-semibold mb-6 text-center">Iniciar Sesion</h2>

    {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

    <input
      type="email"
      placeholder="Email"
      className="w-full px-4 py-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full px-4 py-3 mb-6 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 rounded-lg"
    >
      Conectar
    </button>
  </form>
</div>
  );
}
