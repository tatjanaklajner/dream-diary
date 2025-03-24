"use client";

import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const vividnessMapping = {
  1: { text: "Barely remembered", emoji: "🌧️" },
  2: { text: "Faint", emoji: "☁️" },
  3: { text: "Mild", emoji: "⛅" },
  4: { text: "Clear", emoji: "🌤️" },
  5: { text: "Extremely vivid", emoji: "☀️" },
};

const emojiMapping = {
  terrible: "😞",
  bad: "😕",
  okay: "😊",
  good: "😁",
  great: "🤩",
};

function DreamDetails({ dream }) {
  return (
    <div className="p-8 bg-white dark:bg-[#1f2937] rounded-2xl shadow-lg max-w-3xl mx-auto mt-12 border-t-4 border-t-[var(--dream-blue)] dark:border-t-[#3b82f6]">
      <button
        className="py-2 px-6 bg-[var(--dream-blue)] text-white rounded-full hover:bg-[var(--dream-purple)] dark:hover:bg-[var(--dream-purple)] mb-6 transition-all duration-300"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>

      <h2 className="text-3xl font-semibold text-center text-[var(--dream-purple)] dark:text-white mb-6">
        {dream.title}
      </h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)] dark:text-white">
            Date:
          </span>
          <span className="text-lg text-[var(--dream-blue)] dark:text-gray-300">
            {formatDate(dream.date)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)] dark:text-white">
            Description:
          </span>
          <p className="text-lg text-[var(--dream-blue)] dark:text-gray-300">
            {dream.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)] dark:text-white">
            Sleep Quality:
          </span>
          <span className="text-lg text-[var(--dream-blue)] dark:text-gray-300">
            {emojiMapping[dream.rating]} {dream.rating}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)] dark:text-white">
            Vividness:
          </span>
          <span className="text-lg text-[var(--dream-blue)] dark:text-gray-300">
            {vividnessMapping[dream.vividness]?.text}{" "}
            {vividnessMapping[dream.vividness]?.emoji}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)] dark:text-white">
            Dream Type:
          </span>
          <span className="text-lg text-[var(--dream-blue)] dark:text-gray-300">
            {dream.type}
          </span>
        </div>

        {dream.image && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[var(--dream-purple)] dark:text-white mb-4">
              Image:
            </h3>
            <img
              src={dream.image}
              alt={dream.title}
              className="w-full h-auto max-w-md mx-auto rounded-xl shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DreamDetails;
