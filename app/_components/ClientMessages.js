"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getMessages } from "@/app/_lib/actions";
import MessageForm from "@/app/_components/MessageForm";
import StatusFilter from "@/app/_components/StatusFilter";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import dynamic from "next/dynamic";

const AdminInbox = dynamic(() => import("@/app/_components/AdminInbox"));
const UserInbox = dynamic(() => import("@/app/_components/UserInbox"));

export default function ClientMessages({ session }) {
  const searchParams = useSearchParams();
  const [filteredMessages, setFilteredMessages] = useState([]);

  const filterStatus = searchParams.get("filterStatus") || "all";
  const { userId, role } = session.user;

  useEffect(() => {
    async function fetchMessages() {
      const allMessages = await getMessages(userId, role);
      const filtered =
        filterStatus === "all"
          ? allMessages
          : allMessages.filter((msg) => msg.status === filterStatus);
      setFilteredMessages(filtered);
    }

    fetchMessages();
  }, [filterStatus, userId, role]);

  const updateMessageStatus = (messageId, newStatus) => {
    setFilteredMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-semibold text-center text-primary-blue mb-6">
        Explore Your Dream&apos;s Meaning
      </h1>
      <p className="text-xl text-center text-secondary-blue mb-8">
        Ever wondered what your dreams really mean? Share your dreams with us,
        and let&apos;s help you uncover their hidden messages. Whether
        you&apos;re searching for personal insights or just curious, we&apos;re
        here to help you understand what your dreams are telling you!
      </p>

      <div className="flex flex-col space-y-8">
        {role === "admin" && (
          <div className="flex-1">
            <div className="flex justify-end mb-6">
              <StatusFilter filterStatus={filterStatus} />
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              {filteredMessages.length === 0 ? (
                <p className="text-center text-lg text-secondary-blue">
                  You haven&apos;t submitted any dreams yet.
                </p>
              ) : (
                <AdminInbox
                  messages={filteredMessages}
                  filterStatus={filterStatus}
                  onStatusChange={updateMessageStatus}
                />
              )}
            </Suspense>
          </div>
        )}

        {role !== "admin" && (
          <div className="flex-1">
            <div className="mb-6">
              <MessageForm />
            </div>

            <div className="flex justify-end mb-6">
              <StatusFilter filterStatus={filterStatus} />
            </div>

            <Suspense fallback={<LoadingSpinner />}>
              {filteredMessages.length === 0 ? (
                <p className="text-center text-lg text-secondary-blue">
                  No messages to display.
                </p>
              ) : (
                <UserInbox
                  messages={filteredMessages}
                  filterStatus={filterStatus}
                />
              )}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
