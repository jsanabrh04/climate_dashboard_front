'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getToken } from '../../utils/auth';
import WeatherCard from '../../components/Weathercard';
import WeatherChart from '../../components/Weatherchart';
import { fetchPreviewWeather, fetchWeatherHistory } from '../../api/weather';
import { WeatherData } from '../../types/types';
import ProtectedRoute from '../../components/Protectedroute';
import { io } from 'socket.io-client';

export default function WeatherPage() {
  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      redirect('/');
    }

    const loadWeather = async () => {
      try {
        const current = await fetchPreviewWeather(token);
        const history = await fetchWeatherHistory(token);
        setCurrent(current);
        setHistory(history);
      } catch (error) {
        console.error(error);
        alert('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeather();

    const socket = io('http://localhost:3001'); 

    socket.on('new-weather', (data: WeatherData) => {
      setCurrent(data);
      setHistory(prev => [data, ...prev.slice(0, 23)]); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4">
        {current && <WeatherCard data={current} />}
        {history.length > 0 && <WeatherChart data={history} />}
      </div>
    </ProtectedRoute>
  );
}
