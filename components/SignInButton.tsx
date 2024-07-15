import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: `/profile` });
      }}
    >
      <Button
        size={"lg"}
        type="submit"
        className="flex gap-2 items-center justify-center"
      >
        <span>
          <FcGoogle className="w-4 h-4" />
        </span>
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
};

export default SignInButton;
