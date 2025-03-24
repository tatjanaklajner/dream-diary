import { Suspense } from "react";
import SignOutButton from "../_components/SignOutButton";
import { auth } from "../_lib/auth";
import LoadingSpinner from "../_components/LoadingSpinner";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <section className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-[var(--dream-purple)] mb-6">
          My Profile
        </h1>

        <div className="flex items-center justify-center space-x-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[var(--dream-purple)] shadow-sm">
            <img
              src={session.user.image}
              alt="profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[var(--dream-purple)] mb-1">
              {session.user.name}
            </h2>
            <p className="text-lg text-[var(--dream-blue)]">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Suspense fallback={<LoadingSpinner />}>
            <SignOutButton />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
