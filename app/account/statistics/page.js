import TypeChart from "@/app/_components/TypeChart";
import VividnessChart from "@/app/_components/VividnessChart";
import RatingChart from "@/app/_components/RatingChart";
import { getDreams } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import CreateButton from "@/app/_components/CreateButton";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { Suspense } from "react";

export const metadata = {
  title: "Patterns",
};

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.userId;
  const dreams = await getDreams(null, userId);

  return (
    <div>
      <div className="max-w-7xl mx-auto text-center mb-16 px-6">
        <h1 className="text-5xl font-bold text-blue-900 tracking-tight mb-4">
          Unlock the Secrets of Your Dreams
        </h1>
        <p className="text-xl text-blue-700 font-medium">
          Analyze your dreams&apos; vividness, rating, and types to gain deeper
          insights.
        </p>
      </div>

      {dreams && dreams.length > 0 ? (
        <>
          <Suspense fallback={<LoadingSpinner />}>
            <RatingChart dreams={dreams} />
            <TypeChart dreams={dreams} />
            <VividnessChart dreams={dreams} />
          </Suspense>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center my-16">
          <img src="/cat.png" alt="Sleepy Cat" className="mb-6 w-32 h-auto" />
          <p className="text-xl text-gray-500 mb-4">
            It looks like you haven&apos;t logged any dreams yet. Start by
            creating one!
          </p>
          <CreateButton />
        </div>
      )}
    </div>
  );
}
