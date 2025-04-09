"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon as SolidCalendarDaysIcon,
  ChartBarSquareIcon as SolidChartBarSquareIcon,
  ChatBubbleLeftRightIcon as SolidChatBubbleLeftRightIcon,
  HomeModernIcon as SolidHomeModernIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";

export default function SideNavigation() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="space-y-6">
      <Link
        href="/account/dreams"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        {isActive("/account/dreams") ? (
          <SolidHomeModernIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        ) : (
          <HomeModernIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        )}
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          My Dreams
        </span>
      </Link>
      <Link
        href="/account/calendar"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        {isActive("/account/calendar") ? (
          <SolidCalendarDaysIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        ) : (
          <CalendarDaysIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        )}
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Calendar
        </span>
      </Link>
      <Link
        href="/account/statistics"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        {isActive("/account/statistics") ? (
          <SolidChartBarSquareIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        ) : (
          <ChartBarSquareIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        )}
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Patterns
        </span>
      </Link>
      <Link
        href="/account"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        {isActive("/account") ? (
          <SolidUserIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        ) : (
          <UserIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        )}
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Profile
        </span>
      </Link>
      <Link
        href="/account/messages"
        className="group flex flex-col items-center gap-2 p-3 rounded-lg text-[var(--foreground)] hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-lg"
      >
        {isActive("/account/messages") ? (
          <SolidChatBubbleLeftRightIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6 group-hover:text-white transition-all duration-300" />
        )}
        <span className="text-xs font-medium group-hover:text-white transition-all duration-300">
          Interpretation
        </span>
      </Link>
    </nav>
  );
}
