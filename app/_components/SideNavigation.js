import Link from "next/link";
import {
  UserCircleIcon,
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function SideNavigation() {
  return (
    <nav className="space-y-6">
      <Link
        href="/account/dreams"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        <HomeIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          My Dreams
        </span>
      </Link>
      <Link
        href="/account/calendar"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        <CalendarIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Calendar
        </span>
      </Link>
      <Link
        href="/account/statistics"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        <ChartBarIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Patterns
        </span>
      </Link>
      <Link
        href="/account"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        <UserCircleIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Profile
        </span>
      </Link>
    </nav>
  );
}
