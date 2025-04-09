import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page);
    }
    router.replace(`?${params.toString()}`);
    onPageChange(page);
  };

  return (
    totalPages > 1 && (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition duration-200"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
            boxShadow:
              currentPage === 1 ? "var(--shadow-light)" : "var(--shadow-heavy)",
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded transition duration-200 ${
              currentPage === i + 1
                ? "bg-[var(--primary-blue)] text-white shadow-lg"
                : "bg-[var(--accent-grey)] text-black hover:bg-[var(--primary-blue)] hover:text-white"
            }`}
            style={{
              backgroundColor:
                currentPage === i + 1
                  ? "var(--primary-blue)"
                  : "var(--accent-grey)",
              color: currentPage === i + 1 ? "white" : "black",
              boxShadow:
                currentPage === i + 1
                  ? "var(--shadow-heavy)"
                  : "var(--shadow-light)",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition duration-200"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
            boxShadow:
              currentPage === totalPages
                ? "var(--shadow-light)"
                : "var(--shadow-heavy)",
          }}
        >
          Next
        </button>
      </div>
    )
  );
}
