// app/weather/WeatherChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface WeatherChartProps {
  data: {
    temperature: number;
    capturedAt: string;
  }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const formatted = data.map((item) => ({
    temperature: item.temperature,
    time: new Date(item.capturedAt).toLocaleTimeString(),
  }));

  return (
    <div className="mt-8 w-full h-64">
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
