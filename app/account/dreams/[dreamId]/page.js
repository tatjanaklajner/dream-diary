import DreamDetails from "@/app/_components/DreamDetails";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { getDream } from "@/app/_lib/actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetaData({ params }) {
  const { name } = await getDream(params.dreamId);
  return { title: `Dream ${name}` };
}

async function page({ params }) {
  const { dreamId } = await params;
  let dream = null;

  try {
    dream = await getDream(dreamId);
  } catch (error) {
    console.error(error);
  }

  if (!dream) {
    notFound();
  }

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <DreamDetails dream={dream} />
      </Suspense>
    </div>
  );
}

export default page;
