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
    <div className="p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto mt-12 border-t-4 border-t-[var(--dream-blue)]">
      <button
        className="py-2 px-6 bg-[var(--dream-blue)] text-white rounded-full hover:bg-[var(--dream-purple)] mb-6 transition-all duration-300"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>

      <h2 className="text-3xl font-semibold text-center text-[var(--dream-purple)] mb-6">
        {dream.title}
      </h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)]">
            Date:
          </span>
          <span className="text-lg text-[var(--dream-blue)]">
            {formatDate(dream.date)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)]">
            Description:
          </span>
          <p className="text-lg text-[var(--dream-blue)]">
            {dream.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)]">
            Sleep Quality:
          </span>
          <span className="text-lg text-[var(--dream-blue)]">
            {emojiMapping[dream.rating]} {dream.rating}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)]">
            Vividness:
          </span>
          <span className="text-lg text-[var(--dream-blue)]">
            {vividnessMapping[dream.vividness]?.text}{" "}
            {vividnessMapping[dream.vividness]?.emoji}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-[var(--dream-purple)]">
            Dream Type:
          </span>
          <span className="text-lg text-[var(--dream-blue)]">{dream.type}</span>
        </div>

        {dream.image && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[var(--dream-purple)] mb-4">
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
