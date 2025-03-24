import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction} className="flex justify-center">
      <button className="flex items-center gap-4 bg-dream-purple text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-dream-blue hover:shadow-lg">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
