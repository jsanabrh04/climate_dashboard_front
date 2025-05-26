"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    <div className="mt-8 w-full h-64 bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <XAxis dataKey="time" stroke="#cbd5e1" />
          <YAxis domain={["auto", "auto"]} stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#60a5fa"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
