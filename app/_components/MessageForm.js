"use client";

import { useState } from "react";
import { createDreamInteraction } from "../_lib/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MessageForm = () => {
  const [dream, setDream] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dream", dream);

    setIsSubmitting(true);

    try {
      await createDreamInteraction(formData);
      toast.success("Dream submitted successfully!");
      setDream("");
      setTimeout(() => {
        window.location.href = "/account/messages";
      }, 1000);
    } catch (error) {
      console.error("Error submitting dream:", error);
      toast.error("Failed to submit dream");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-center text-primary-blue dark:text-primary-blue mb-4">
        Share Your Dream
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Describe your dream"
          required
          className="w-full p-4 text-base text-foreground dark:text-foreground bg-input-bg dark:bg-gray-700 border border-input-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none mb-4 h-40" // Adjust height here
        />
        <button
          type="submit"
          className="w-full py-3 text-white bg-button-bg hover:bg-button-hover-bg dark:bg-button-bg dark:hover:bg-button-hover-bg rounded-lg text-lg shadow-lg focus:outline-none transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Dream"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MessageForm;
