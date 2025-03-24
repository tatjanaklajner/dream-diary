import DreamDetails from "@/app/_components/DreamDetails";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { getDream } from "@/app/_lib/actions";
import Link from "next/link";
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
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center bg-red-100 text-red-600 p-8 rounded-lg shadow-xl max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Permission Denied</h2>
          <p className="text-xl mb-6">
            You do not have permission to view this dream.
          </p>
          <div className="flex justify-center mb-6">
            <img src="/angry.png" alt="bear" className="w-40 h-40" />
          </div>
          <Link
            href="/"
            className="mt-6 px-8 py-4 bg-primary-blue text-white rounded-xl hover:bg-secondary-blue hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-blue transition-all text-xl font-semibold"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
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
