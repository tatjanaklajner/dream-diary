"use client";

import { useState } from "react";
import { createAdminReply } from "../_lib/actions";
import Link from "next/link";
import { toast } from "react-toastify";

export default function MessageDetails({ message, userRole, user }) {
  const [isPending, startTransition] = useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    startTransition(true);

    const formData = new FormData(e.target);
    const interactionId = message.id;

    try {
      const response = await createAdminReply(formData, interactionId);

      if (response.success) {
        toast.success("Reply submitted successfully.");

        setTimeout(() => {
          window.location.href = "/account/messages";
        }, 1000);
      } else {
        toast.error("Failed to submit reply.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      startTransition(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-yellow-300 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100";
      case "seen":
        return "bg-green-300 text-green-800 dark:bg-green-600 dark:text-green-100";
      case "interpreted":
        return "bg-blue-300 text-blue-800 dark:bg-blue-600 dark:text-blue-100";
      default:
        return "bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8 relative">
      <div className="absolute top-8 left-8">
        <Link href="/account/messages">
          <button className="text-primary-blue dark:text-secondary-blue font-medium py-2 px-4 rounded-md hover:bg-primary-blue dark:hover:bg-secondary-blue hover:text-white dark:hover:text-white transition duration-300">
            &larr; Back
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-semibold text-primary-blue dark:text-primary-blue text-center mb-8">
        Dream Submission Details
      </h1>

      <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-600 pb-4">
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {user.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
            message.status
          )}`}
        >
          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
        </span>
      </div>

      <div className="space-y-6 mb-8">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Subject: Dream Interpretation
        </p>

        <div className="mt-4">
          <p className="text-lg text-gray-800 dark:text-gray-100">Dream:</p>
          <p className="text-lg text-secondary-blue dark:text-secondary-blue mt-2">
            {message.dream}
          </p>
        </div>
      </div>

      {userRole === "admin" ? (
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Received on: {new Date(message.created_at).toLocaleString()}
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm mt-8">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Admin Reply:
            </p>
            <form onSubmit={handleReply} className="space-y-6">
              <textarea
                id="interpretation"
                name="interpretation"
                rows="6"
                className="w-full p-4 border border-input-border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition duration-300 dark:bg-gray-700 dark:text-gray-100"
                required
                placeholder="Write your interpretation here..."
              />
              <button
                type="submit"
                className={`w-full py-3 px-6 bg-primary-blue text-white font-semibold rounded-md shadow-md hover:bg-secondary-blue hover:shadow-xl transition duration-300 dark:bg-primary-blue dark:hover:bg-secondary-blue ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Send Reply"}
              </button>
            </form>
          </div>
        </>
      ) : (
        <div>
          {message.interpretation && (
            <div className="mt-8 bg-accent-grey dark:bg-gray-600 p-6 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Admin&apos;s Reply:
              </p>
              <p className="text-lg text-secondary-blue dark:text-secondary-blue">
                {message.interpretation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
