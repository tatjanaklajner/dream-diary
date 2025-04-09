"use client";

import { useSearchParams, useRouter } from "next/navigation";

function DateFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get("filterStatus") || "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("filterStatus");
    } else {
      params.set("filterStatus", filter);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const filters = [
    { value: "all", label: "All" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "lastmonth", label: "Last Month" },
    { value: "thisyear", label: "This Year" },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-end w-full">
      {filters.map(({ value, label }) => {
        const isActive = activeFilter === value;

        return (
          <button
            key={value}
            onClick={() => handleFilter(value)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition duration-200 ${
              isActive
                ? "bg-[var(--secondary-blue)] text-white shadow-lg"
                : "bg-[var(--accent-grey)] text-black hover:bg-[var(--primary-blue)] hover:text-white"
            }`}
            style={{
              boxShadow: isActive
                ? "var(--shadow-heavy)"
                : "var(--shadow-light)",
              backgroundColor: isActive
                ? "var(--primary-blue)"
                : "var(--accent-grey)",
              color: isActive ? "white" : "black",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default DateFilter;
