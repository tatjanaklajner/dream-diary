"use client";

import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { EyeIcon } from "@heroicons/react/24/solid";
import DeleteButton from "./DeleteButton";
import DreamForm from "./DreamForm";
import Modal from "./Modal";
import UpdateButton from "./UpdateButton";
import Link from "next/link";

function DreamItem({
  dream,
  onDelete,
  onUpdate,
  activeMenuId,
  setActiveMenuId,
}) {
  const [editMode, setEditMode] = useState(false);
  const { id, title, image, description, date } = dream;

  const toggleMenu = () => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const formattedDate = date ? new Date(date).toLocaleDateString("en-GB") : "";

  return (
    <div className="bg-white dark:bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-6 flex hover:shadow-lg dark:hover:shadow-lg transition-shadow duration-300">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-cover rounded-lg mr-6"
        />
      )}
      <div className="flex-1 relative">
        <Modal isOpen={editMode} onClose={() => setEditMode(false)}>
          <DreamForm
            dream={dream}
            onUpdate={onUpdate}
            onClose={() => setEditMode(false)}
          />
        </Modal>

        <h3 className="text-gray-800 dark:text-gray-100 text-xl font-semibold mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>

        {formattedDate && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {formattedDate}
          </p>
        )}

        <button
          onClick={toggleMenu}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <FaEllipsisV />
        </button>

        {activeMenuId === id && (
          <div className="absolute top-8 right-0 mt-2 bg-white dark:bg-[#374151] p-3 rounded-lg shadow-lg w-48 z-10 border border-gray-200 dark:border-gray-700">
            <Link
              href={`/account/dreams/${id}`}
              className="button-link mt-4 px-4 py-2 bg-[#1e3a8a] text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-[#1d4ed8] mb-2 block text-center"
            >
              <EyeIcon className="inline mr-2 w-5 h-5" />
              VIEW DETAILS
            </Link>

            <UpdateButton
              dreamId={id}
              handleEditClick={() => setEditMode(true)}
              className="w-full"
            />

            <DeleteButton
              id={id}
              onDelete={async () => {
                await onDelete(id);
                setActiveMenuId(null);
              }}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DreamItem;
