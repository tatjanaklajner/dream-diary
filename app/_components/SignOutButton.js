import { signOutAction } from "../_lib/actions";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

function SignOutButton() {
  return (
    <div className="text-center mt-8">
      <button
        onClick={signOutAction}
        className="flex items-center justify-center bg-[var(--dream-pink)] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[var(--dream-blue)] hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
        Sign Out
      </button>
    </div>
  );
}

export default SignOutButton;
