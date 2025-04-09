import React, { useState } from "react";
import { useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

function DeleteButton({ id, onDelete, className }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeleteClick() {
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    setIsModalOpen(false);
    startTransition(async () => {
      try {
        await onDelete(id);
        toast.success("Dream deleted successfully");
      } catch (error) {
        toast.error("Failed to delete the dream");
      }
    });
  }

  function handleCancelDelete() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className={`${className} px-4 py-2 bg-[#1e3a8a] text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-2xl focus:outline-none mb-2`}
      >
        <span>
          <TrashIcon className="inline mr-2 w-5 h-5" /> Delete
        </span>
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this dream?"
      />
    </>
  );
}

export default DeleteButton;
