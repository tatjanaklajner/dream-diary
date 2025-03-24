import SignInButton from "../_components/SignInButton";
import { Suspense } from "react";
import LoadingSpinner from "../_components/LoadingSpinner";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-primary-blue mb-4">
          Welcome to Your Dream Diary
        </h1>
        <p className="text-secondary-blue mb-8 text-lg">
          Sign in to track, explore, and reflect on your dreams.
        </p>
        <Suspense fallback={<LoadingSpinner />}>
          <SignInButton />
        </Suspense>
      </div>
    </div>
  );
}
