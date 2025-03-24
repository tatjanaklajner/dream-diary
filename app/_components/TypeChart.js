"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const dreamTypes = [
  "normal",
  "nightmare",
  "lucid",
  "recurring",
  "prophetic",
  "vivid",
];

const colorMapping = {
  normal: "#28a745",
  nightmare: "#dc3545",
  lucid: "#007bff",
  recurring: "#fd7e14",
  prophetic: "#6610f2",
  vivid: "#17a2b8",
};

export default function TypeChart({ dreams }) {
  const dreamTypeCount = dreamTypes.map((type) => {
    const count = dreams.filter((dream) => dream.type === type).length;
    return { name: type, count, color: colorMapping[type] };
  });

  return (
    <div className="dream-type-chart-container bg-white dark:bg-[#2d3748] p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--primary-blue)] dark:text-white">
        Dream Types
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dreamTypeCount}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#5e4b56" }} />

          <YAxis
            tick={{ fontSize: 12, fill: "#5e4b56" }}
            allowDecimals={false}
            domain={[0, "auto"]}
          />

          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const dreamType = payload[0].payload.name;
              const count = payload[0].payload.count;
              return (
                <div
                  style={{
                    backgroundColor: "#e0f7fa",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  <p>
                    <strong>{dreamType}</strong>
                  </p>
                  <p>Number of dreams: {count}</p>
                </div>
              );
            }}
          />

          <Legend wrapperStyle={{ textAlign: "center" }} />

          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {dreamTypeCount.map((type) => (
              <Cell key={type.name} fill={type.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
