"use client";

import { changeMessageStatus } from "@/app/_lib/actions";
import { useState } from "react";
import Pagination from "./Pagination";
import { IoCheckmarkDone } from "react-icons/io5";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AdminInbox({ messages, onStatusChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = messages.slice(start, start + itemsPerPage);

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

  async function handleStatusChange(messageId) {
    try {
      toast.success("Changing message status to 'seen'...");

      const response = await changeMessageStatus(messageId);

      if (response.success) {
        toast.success("Message status changed to 'seen'!");

        onStatusChange(messageId, "seen");
      } else {
        toast.error(
          response.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again";
      toast.error(errorMessage);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-semibold text-primary-blue dark:text-primary-blue text-center mb-6">
        Admin Inbox
      </h1>
      <ul className="space-y-6">
        {paginatedMessages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No messages found
          </p>
        ) : (
          paginatedMessages.map((message) => (
            <li
              key={message.id}
              className="p-4 border border-input-border dark:border-accent-grey rounded-lg shadow-sm hover:shadow-lg transition-all bg-white dark:bg-gray-700"
            >
              <div className="flex justify-between items-start relative">
                <span
                  className={`absolute top-2 right-2 px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    message.status
                  )}`}
                >
                  {message.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-lg font-medium text-foreground dark:text-foreground">
                  Dream:
                </p>
                <p className="text-xl text-secondary-blue dark:text-secondary-blue mb-2">
                  {message.dream}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex space-x-4">
                  {message.status === "delivered" && (
                    <button
                      onClick={() => handleStatusChange(message.id)}
                      className="mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 hover:shadow-xl transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <IoCheckmarkDone className="text-white" />
                      <span>Mark as Seen</span>
                    </button>
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/account/messages/${message.id}`}
                    className="button-link mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 hover:shadow-xl transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
