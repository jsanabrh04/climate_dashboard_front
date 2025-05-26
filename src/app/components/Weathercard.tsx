import React from 'react';

interface WeatherCardProps {
  data: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    conditions: string;
    capturedAt: string;
  };
  showTitle?: boolean;
}

const WeatherCard = ({ data, showTitle = true }: WeatherCardProps) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow text-center border border-gray-800">
      {showTitle && (
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Clima actual</h2>
      )}
      <div className="space-y-1 text-sm text-gray-300">
        <p>🌡️ <span className="font-medium text-white">Temp:</span> {data.temperature}°C</p>
        <p>🤒 <span className="font-medium text-white">Sensación:</span> {data.feelsLike}°C</p>
        <p>💧 <span className="font-medium text-white">Humedad:</span> {data.humidity}%</p>
        <p>☁️ <span className="font-medium text-white">Condiciones:</span> {data.conditions}</p>
        <p>🕓 <span className="font-medium text-white">Capturado:</span> {new Date(data.capturedAt).toLocaleString()}</p>
      </div>
    </div>

);
}

export default WeatherCard;

