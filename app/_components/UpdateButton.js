import { PencilSquareIcon } from "@heroicons/react/24/solid"; // Heroicon for pencil/edit

function UpdateButton({ dreamId, handleEditClick, className }) {
  return (
    <button
      onClick={handleEditClick}
      className={`${className} px-4 py-2 bg-[#1e3a8a] text-white text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:bg-[#1d4ed8] hover:scale-105 hover:shadow-2xl focus:outline-none mb-2`}
    >
      <PencilSquareIcon className="inline mr-2 w-5 h-5" /> Edit
    </button>
  );
}

export default UpdateButton;
