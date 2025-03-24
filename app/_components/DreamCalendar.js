"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "./Modal";
import DreamForm from "./DreamForm";
import DreamItem from "./DreamItem";
import "@/app/_styles/dreamCalendar.css";

function DreamCalendar({ dreams = [] }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDream, setEditingDream] = useState(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalOpen(false);
    setEditingDream(null);
  };

  const getDreamsForSelectedDate = (date) => {
    const formattedSelectedDate = formatDate(date);
    return dreams.filter(
      (dream) => formatDate(new Date(dream.date)) === formattedSelectedDate
    );
  };

  const dreamsForSelectedDate = getDreamsForSelectedDate(selectedDate);

  const handleEditDream = (dream) => {
    setEditingDream(dream);
    setModalOpen(true);
  };

  const tileClassName = ({ date }) => {
    const formattedDate = formatDate(date);
    if (formattedDate === formatDate(selectedDate)) {
      return "dream-calendar__tile--active";
    }

    const dreamsForThisTile = getDreamsForSelectedDate(date);
    return dreamsForThisTile.length > 0 ? "dream-calendar__tile--dream" : "";
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingDream(null);
  };

  useEffect(() => {
    if (modalOpen) {
      setEditingDream(null);
    }
  }, [selectedDate]);

  return (
    <div className="dream-calendar-wrapper p-6 rounded-lg shadow-heavy">
      <h2 className="text-3xl text-var(--primary-blue) mb-4">Dream Calendar</h2>
      <Calendar
        className="dream-calendar rounded-lg border border-var(--primary-blue) shadow-light hover:shadow-heavy transition-shadow duration-300"
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      {selectedDate && (
        <div className="text-center mt-4">
          <button
            onClick={() => setModalOpen(true)}
            className="py-2 px-6 rounded-md bg-var(--primary-blue) text-white hover:bg-var(--secondary-blue)"
          >
            Create Dream
          </button>
        </div>
      )}

      {dreamsForSelectedDate.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-xl text-var(--primary-blue) mb-2">
            Your Dreams On This Day
          </h3>
          <div>
            {dreamsForSelectedDate.map((dream, index) => (
              <DreamItem
                key={index}
                dream={dream}
                onDelete={(id) => console.log("Delete dream with ID:", id)}
                onUpdate={(updatedDream) =>
                  console.log("Update dream", updatedDream)
                }
                onShowDetails={() => console.log("Show dream details")}
                onEdit={() => handleEditDream(dream)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 text-gray-600">
          No dreams recorded for this day.
        </div>
      )}

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <DreamForm
            dream={editingDream}
            date={formatDate(selectedDate)}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default DreamCalendar;
