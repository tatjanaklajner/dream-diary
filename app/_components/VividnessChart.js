"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";

const vividnessMapping = {
  1: { text: "Barely remembered", emoji: "🌧️", color: "#e74c3c" },
  2: { text: "Faint", emoji: "☁️", color: "#f39c12" },
  3: { text: "Mild", emoji: "⛅", color: "#2ecc71" },
  4: { text: "Clear", emoji: "🌤️", color: "#3498db" },
  5: { text: "Extremely vivid", emoji: "☀️", color: "#9b59b6" },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default function VividnessChart({ dreams }) {
  const filteredDreams = dreams.filter(
    (dream) => dream.vividness >= 1 && dream.vividness <= 5
  );

  const chartData = filteredDreams.map((dream) => ({
    name: formatDate(dream.date),
    vividness: dream.vividness,
    emoji: vividnessMapping[dream.vividness]?.emoji || "❓",
    text: vividnessMapping[dream.vividness]?.text || "Unknown",
    color: vividnessMapping[dream.vividness]?.color || "#f39c12",
  }));

  return (
    <div className="vividness-chart-container bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--primary-blue)]">
        Vividness of Dreams
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#5e4b56" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />

          <YAxis
            dataKey="vividness"
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={({ x, y, payload }) => {
              const vividness = vividnessMapping[payload.value] || {
                emoji: "❓",
                text: "Unknown",
              };
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    fill="#5e4b56"
                    fontSize={20}
                  >
                    {vividness.emoji}
                  </text>
                </g>
              );
            }}
          />

          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const vividnessValue = payload[0].payload.vividness;
              const vividness = vividnessMapping[vividnessValue] || {
                emoji: "❓",
                text: "Unknown",
              };
              return (
                <div
                  style={{
                    backgroundColor: "#e0f7fa",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  <p className="text-[var(--foreground)]">
                    <strong>{vividness.emoji}</strong> {vividness.text}
                  </p>
                </div>
              );
            }}
          />

          <Line
            type="monotone"
            dataKey="vividness"
            stroke="#3498db"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
