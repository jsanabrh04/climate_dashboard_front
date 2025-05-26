import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchPreviewWeather = async (token: string) => {
  const res = await axios.get(`${API_URL}/weather/latest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchWeatherHistory = async (token: string, limit = 24) => {
  const res = await axios.get(`${API_URL}/weather/history?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
