import Link from "next/link";

export default function MessageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl text-primary-blue font-bold">
        Message Not Found
      </h1>
      <p className="text-secondary-blue mt-4 text-lg">
        Oops! It looks like the message you&apos;re searching for doesn&apos;t
        exist.
      </p>
      <img src="/bear.png" alt="bear" className="w-32 h-32 mt-6" />
      <Link
        href="/account/messages"
        className="mt-6 px-8 py-4 bg-primary-blue text-white rounded-xl hover:bg-secondary-blue hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-blue transition-all text-xl font-semibold"
      >
        Go Back to Messages
      </Link>
    </div>
  );
}
