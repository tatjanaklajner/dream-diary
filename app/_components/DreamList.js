"use client";

import { useOptimistic, useState } from "react";
import DreamItem from "./DreamItem";
import { deleteDream, updateDream } from "../_lib/actions";
import DreamDetails from "./DreamDetails";

function DreamList({ dreams }) {
  const [optimisticDreams, optimisticUpdate, optimisticDelete] = useOptimistic(
    dreams,
    (curDreams, id) => {
      return curDreams.map((dream) =>
        dream.id === updateDream.id ? updateDream : dream
      );
    }
  );

  const [selectedDream, setSelectedDream] = useState(null);

  async function handleDelete(id) {
    const updatedDreams = optimisticDreams.filter((dream) => dream.id !== id);
    optimisticUpdate(updatedDreams);

    try {
      await deleteDream(id);
    } catch (error) {
      optimisticUpdate(dreams);
      console.error("Failed to delete the dream:", error);
    }
  }

  async function handleUpate(updatedDream) {
    try {
      await updateDream(updatedDream.id, updatedDream.formData);
    } catch (error) {
      console.error("Failed to update the dream", error);
    }
  }

  function handleShowDetails(dream) {
    setSelectedDream(dream);
  }
  return (
    <div className="mt-6">
      {optimisticDreams.length > 0 ? (
        optimisticDreams.map((dream) => (
          <DreamItem
            dream={dream}
            key={dream.id}
            onDelete={handleDelete}
            onUpdate={handleUpate}
            onShowDetails={handleShowDetails}
          />
        ))
      ) : (
        <p>No dreams to show.</p>
      )}
    </div>
  );
}

export default DreamList;
