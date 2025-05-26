'use client';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('token', res.data.access_token);
  return res.data.access_token;
};

export const logout = () => {
  localStorage.removeItem('token');
};
