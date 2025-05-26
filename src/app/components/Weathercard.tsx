// app/weather/WeatherCard.tsx
import React from 'react';

interface WeatherCardProps {
  data: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    conditions: string;
    capturedAt: string;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => (
  <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center">
    <h2 className="text-2xl font-semibold mb-2">Current Weather</h2>
    <p>🌡️ Temp: {data.temperature}°C</p>
    <p>🤒 Feels Like: {data.feelsLike}°C</p>
    <p>💧 Humidity: {data.humidity}%</p>
    <p>☁️ Conditions: {data.conditions}</p>
    <p>🕓 Captured: {new Date(data.capturedAt).toLocaleString()}</p>
  </div>
);

export default WeatherCard;
