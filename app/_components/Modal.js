import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      const handleKeydown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeydown);
      return () => window.removeEventListener("keydown", handleKeydown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      style={{ animation: "fadeIn 0.3s ease-in-out" }}
    >
      <div
        className="bg-white p-8 rounded-3xl shadow-xl max-w-4xl sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 h-[90vh] overflow-hidden transform transition-all duration-300 ease-in-out"
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="max-h-[calc(90vh-3rem)] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
