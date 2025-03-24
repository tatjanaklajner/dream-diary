import Link from "next/link";
import Image from "next/image";
import { auth } from "../_lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-[var(--primary-blue)] shadow-lg p-4 fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="Dream Diary Logo"
            width={40}
            height={40}
            className="rounded-full"
          />

          <span className="text-white text-lg font-semibold">Dream Diary</span>
        </Link>

        <div className="flex items-center space-x-6">
          {session?.user ? (
            <Link href="/account" className="flex items-center space-x-2">
              <img
                src={session.user.image}
                alt={session.user.name}
                width={35}
                height={35}
                className="rounded-full ring-2 ring-white shadow-md"
              />
              <span className="text-sm text-white font-medium">
                {session.user.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-[var(--secondary-blue)] text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[var(--primary-blue)] transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
