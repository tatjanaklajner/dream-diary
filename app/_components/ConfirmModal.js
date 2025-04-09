import React from "react";

function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ animation: "fadeIn 0.3s ease-in-out" }}
    >
      <div className="absolute inset-0 bg-transparent backdrop-blur-lg"></div>

      <div
        className="bg-white dark:bg-[#1f2937] p-6 rounded-lg shadow-lg max-w-sm w-full z-10"
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {message}
        </h2>
        <div className="flex justify-center space-x-4">
          <button onClick={onCancel} className="px-4 py-2">
            No
          </button>
          <button onClick={onConfirm} className="px-4 py-2">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
