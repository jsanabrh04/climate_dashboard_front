"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getToken } from "../../utils/auth";
import WeatherCard from "../../components/Weathercard";
import WeatherChart from "../../components/Weatherchart";
import { fetchPreviewWeather, fetchWeatherHistory } from "../../api/weather";
import ProtectedRoute from "../../components/Protectedroute";
import { WeatherData } from "../../types/types";

export default function WeatherPage() {
  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      redirect("/");
    }

    const loadWeather = async () => {
      try {
        const current = await fetchPreviewWeather(token);
        const history = await fetchWeatherHistory(token);
        setCurrent(current);
        setHistory(history);
      } catch (error) {
        console.error(error);
        alert("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto bg-gray-950 p-6 text-white">
        {current && <WeatherCard data={current} />}
        {history.length > 0 && <WeatherChart data={history} />}
      </div>
    </ProtectedRoute>
  );
}
