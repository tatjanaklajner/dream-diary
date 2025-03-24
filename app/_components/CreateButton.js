"use client";

import { useState } from "react";
import Modal from "./Modal";
import DreamForm from "./DreamForm";

function CreateButton({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={handleCreateClick}
        className="py-2 px-6 rounded-md bg-var(--primary-blue) text-white hover:bg-var(--secondary-blue)"
      >
        {children}
      </button>

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <DreamForm
            date={selectedDate.toISOString().split("T")[0]}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default CreateButton;
