"use client";

import { useState, useEffect, useOptimistic, useRef } from "react";
import DreamItem from "./DreamItem";
import { deleteDream, updateDream } from "../_lib/actions";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import DateFilter from "./DateFilter";

function DreamList({ dreams, pageSize = 5 }) {
  const [optimisticDreams, optimisticUpdate] = useOptimistic(
    dreams,
    (curDreams, updatedDream) => {
      return curDreams.map((dream) =>
        dream.id === updatedDream.id ? updatedDream : dream
      );
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const wrapperRef = useRef();

  const searchParams = useSearchParams();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const filterStatus = searchParams.get("filterStatus") || "all";
    setFilter(filterStatus);
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filterDreams = (dreams) => {
    const now = new Date();
    return dreams.filter((dream) => {
      const dreamDate = new Date(dream.date);
      switch (filter) {
        case "last7days":
          return now - dreamDate <= 7 * 24 * 60 * 60 * 1000;
        case "lastmonth":
          return now - dreamDate <= 30 * 24 * 60 * 60 * 1000;
        case "thisyear":
          return dreamDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredDreams = filterDreams(optimisticDreams);

  useEffect(() => {
    const total = Math.ceil(filteredDreams.length / pageSize);
    setTotalPages(total);
  }, [filteredDreams, pageSize]);

  const paginatedDreams = filteredDreams.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = async (id) => {
    const updated = optimisticDreams.filter((dream) => dream.id !== id);
    optimisticUpdate(updated);

    try {
      await deleteDream(id);
    } catch (error) {
      console.error("Delete failed", error);
      optimisticUpdate(dreams);
    }
  };

  const handleUpdate = async (updatedDream) => {
    try {
      await updateDream(updatedDream.id, updatedDream.formData);
      optimisticUpdate(updatedDream);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div ref={wrapperRef} className="mt-6 flex flex-col gap-6">
      <DateFilter />

      <div className="mt-6">
        {paginatedDreams.length > 0 ? (
          paginatedDreams.map((dream) => (
            <DreamItem
              key={dream.id}
              dream={dream}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              activeMenuId={activeMenuId}
              setActiveMenuId={setActiveMenuId}
            />
          ))
        ) : (
          <p>No dreams to show.</p>
        )}
        {filteredDreams.length > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default DreamList;
