import DreamList from "@/app/_components/DreamList";
import { getDreams } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import CreateButton from "@/app/_components/CreateButton";
import { Suspense } from "react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { PlusIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Dreams",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  const userId = session.user.userId;
  const dreams = await getDreams(null, userId);

  if (!dreams.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-semibold text-indigo-800 mb-4">
          Dream Big!
        </h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven&apos;t recorded any dreams yet. Start adding your
          dreams, and let&apos;s explore your dream world together!
        </p>
        <img src="/cat.png" alt="Sleepy Cat" className="mb-6 w-32 h-auto" />
        <CreateButton>Add new dream</CreateButton>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <DreamList dreams={dreams} />
      </Suspense>
      <div className="fixed bottom-6 right-6 mb-6">
        <CreateButton className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500 text-white">
          <PlusIcon className="w-6 h-6" />
        </CreateButton>
      </div>
    </div>
  );
}
