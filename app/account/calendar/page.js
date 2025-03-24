import DreamCalendar from "@/app/_components/DreamCalendar";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { getDreams } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { Suspense } from "react";

export const metadata = {
  title: "Calendar",
};

async function page() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.userId;
  const dreams = await getDreams(null, userId);
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <DreamCalendar dreams={dreams} />
      </Suspense>
    </div>
  );
}

export default page;
