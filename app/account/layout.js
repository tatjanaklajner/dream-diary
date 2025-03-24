import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 bg-gradient-to-b bg-[var(--background)] text-[var(--foreground)] p-4 shadow-md fixed top-16 left-0 h-full z-10">
        <SideNavigation />
      </aside>

      <main className="flex-1 ml-48 pt-16 px-6">
        <section className="space-y-8">{children}</section>
      </main>
    </div>
  );
}
