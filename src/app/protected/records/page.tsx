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
        const history = await fetchWeatherHistory(token, 100); 
        setData(history);
      } catch (error) {
        console.error('Error loading weather history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.capturedAt).getTime();
    const dateB = new Date(b.capturedAt).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Registros Climáticos</h1>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
            className="p-2 border rounded"
          >
            <option value="desc">Más recientes primero</option>
            <option value="asc">Más antiguos primero</option>
          </select>
        </div>

        {loading ? (
          <p>Cargando registros...</p>
        ) : (
          <div className="space-y-4">
            {sortedData.map((record, index) => (
              <WeatherCard key={index} data={record} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
