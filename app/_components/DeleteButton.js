import { useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"; // Heroicon for trash
import { toast } from "react-toastify";

function DeleteButton({ id, onDelete, className }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this dream"))
      startTransition(() => onDelete(id));
    toast.success("Dream deleted successfully");
  }

  return (
    <button
      onClick={handleDelete}
      className={`${className} px-4 py-2 bg-[#1e3a8a] text-white text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:bg-[#1d4ed8] hover:scale-105 hover:shadow-2xl focus:outline-none mb-2`}
    >
      {!isPending ? (
        <span>
          <TrashIcon className="inline mr-2 w-5 h-5" /> Delete
        </span>
      ) : (
        <span>Deleting...</span>
      )}
    </button>
  );
}

export default DeleteButton;
