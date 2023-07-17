import { useSession, signIn, signOut } from "next-auth/react";
import { Bars3Icon, BellIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <button
      type="button"
      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      onClick={() => signIn()}
    >

      <div class="inline-flex items-center ">
        <div class="side">
          <ArrowRightCircleIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div class="flex p-1">
          <div>
            <p>Login</p>
          </div>
        </div>
      </div>

    </button>
  );
}
