'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getToken } from '../../utils/auth';
import { fetchWeatherHistory } from '../../api/weather';
import WeatherCard from '../../components/Weathercard';
import ProtectedRoute from '../../components/Protectedroute';
import { WeatherData } from '../../types/types';

export default function RegistrosPage() {
  const [data, setData] = useState<WeatherData[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      redirect('/');
    }

    const loadHistory = async () => {
      try {
        const history = await fetchWeatherHistory(token, 24); 
        setData(history);
      } catch (error) {
        console.error('Error loading weather history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

const sortedData = [...data]
  .sort((a, b) => {
    const dateA = new Date(a.capturedAt).getTime();
    const dateB = new Date(b.capturedAt).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  })
  .slice(0, 24);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950 text-white p-6">
  <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
    <h1 className="text-3xl font-semibold text-blue-400">Registros Climáticos</h1>
    <select
      value={order}
      onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
      className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="desc">Más recientes primero</option>
      <option value="asc">Más antiguos primero</option>
    </select>
  </div>

  {loading ? (
    <p className="text-gray-400 text-center">Cargando registros...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {sortedData.map((record) => (
        <WeatherCard key={record.id} data={record} showTitle={false} />
      ))}
    </div>
  )}
</div>
    </ProtectedRoute>
  );
}
