import { useSession, signIn, signOut } from "next-auth/react";
import {
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Component() {
  const { data: session } = useSession();
  const userImage =
    session?.user?.image ||
    "https://images.unsplash.com/photo-1586374579358-9d19d632b6df";
  return (
    <>
      <Menu as="div" className="relative ml-3">
        {(session?.user && (
          // Logged in
          <>
            <div>
              <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={userImage} alt="" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/projects"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                      )}
                    >
                      Your Projects
                    </a>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700",
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={`/api/auth/signout`}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )) || (
            // Not logged in
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => signIn()}
            >
              <div className="inline-flex items-center">
                <ArrowRightCircleIcon className="h-6 w-6" aria-hidden="true" />
                <p>Login</p>
              </div>
            </button>
          )}
      </Menu>
    </>
  );
}
