"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const colorMapping = {
  terrible: "#dc3545",
  bad: "#fd7e14",
  okay: "#28a745",
  good: "#007bff",
  great: "#6610f2",
};

const emojiMapping = {
  terrible: "😞",
  bad: "😕",
  okay: "😊",
  good: "😁",
  great: "🤩",
};

export default function RatingChart({ dreams }) {
  if (!dreams || dreams.length === 0) {
    return <div>No dream data available</div>;
  }

  const totalDreams = dreams.length;

  const sleepQualityCount = ["terrible", "bad", "okay", "good", "great"].map(
    (rating) => {
      const count = dreams.filter((dream) => dream.rating === rating).length;
      const percentage = ((count / totalDreams) * 100).toFixed(1);
      return {
        name: rating,
        count,
        percentage,
        color: colorMapping[rating],
        emoji: emojiMapping[rating],
      };
    }
  );

  const filteredData = sleepQualityCount.filter((item) => item.count > 0);

  return (
    <div className="sleep-quality-chart-container bg-white dark:bg-[#2d3748] p-4 rounded-lg shadow-lg w-full h-full">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--primary-blue)] dark:text-white">
        Sleep Quality Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            labelLine={false}
            label={({ name, percentage, emoji }) =>
              `${emoji} ${name}: ${percentage}%`
            }
            isAnimationActive={true}
            animationDuration={1000}
          >
            {filteredData.map((quality) => (
              <Cell key={quality.name} fill={quality.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const { name, count, percentage, emoji } = payload[0].payload;
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
                    <strong>{emoji}</strong> {name}
                  </p>
                  <p>Number of dreams: {count}</p>
                  <p>Percentage: {percentage}%</p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
