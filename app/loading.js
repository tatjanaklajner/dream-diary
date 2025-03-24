import LoadingSpinner from "./_components/LoadingSpinner";

function loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LoadingSpinner />
    </div>
  );
}

export default loading;
