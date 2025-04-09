"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function UserInbox({ messages, filterStatus }) {
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

  // Reset to first page when messages or filterStatus change
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page
  }, [messages, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page on pagination change
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-semibold text-primary-blue dark:text-primary-blue text-center mb-6">
        Your Dreams
      </h1>
      <ul className="space-y-6">
        {paginatedMessages.length === 0 ? (
          <p className="text-foreground dark:text-foreground">
            No messages found
          </p>
        ) : (
          paginatedMessages.map((message) => (
            <li
              key={message.id}
              className="p-4 border border-input-border dark:border-accent-grey rounded-lg shadow-sm hover:shadow-lg transition-all dark:bg-gray-700"
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

                {message.status === "seen" && (
                  <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    <p>
                      We&apos;re reviewing your dream and will get back to you
                      with an interpretation soon.
                    </p>
                  </div>
                )}

                {message.interpretation && (
                  <div className="bg-accent-grey dark:bg-gray-600 p-4 rounded-lg">
                    <div className="flex justify-end">
                      <Link
                        href={`/account/messages/${message.id}`}
                        className="button-link mt-4"
                      >
                        <EnvelopeIcon className="h-6 w-6 mr-2 inline-flex" />
                        Show Reply
                      </Link>
                    </div>
                  </div>
                )}
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
