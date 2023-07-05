import React, {Fragment} from "react";
import {Popover, Transition} from "@headlessui/react";
import {
  ArrowPathRoundedSquareIcon,
  Bars3Icon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import AuthService from "../../service/authService";
import {useDispatch, useSelector} from "react-redux";
import {revokeAuthentication, userIsAuthSelector,} from "@context/redux/user/userSlice";
import {createNotification, ToastData} from "@context/redux/UI/UISlice";
import {nanoid} from "nanoid";
import logging from "@utils/logging";
import router from "next/router";

const navigation = [
  {
    name: "Investments",
    href: "/",
    icon: ChartBarIcon,
  },
  {
    name: "Image tool",
    href: "/images",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Income tool",
    href: "/income",
    icon: CurrencyDollarIcon,
  },
  {
    name: "ROI calculator",
    href: "/roi",
    icon: ArrowPathRoundedSquareIcon,
  },
];

export default function Header() {
  const userIsAuth = useSelector(userIsAuthSelector);
  const dispatch = useDispatch();
  const signOut = async () => {
    console.log("signOut pressed.");
    await AuthService.logOut()
        .then((_) => dispatch(revokeAuthentication()))
        .then((_) => {
          const notification: ToastData = {
            id: nanoid(16),
            details: `Successfully logged out.`,
            type: `success`,
            hidden: false,
          };
          createNotification(dispatch, notification);
          router.replace("/login");
        })
        .catch((err) => {
          const msg = `Log out failed: ${err.message || err}`;
          const notification: ToastData = {
            id: nanoid(16),
            details: msg,
            type: `error`,
            hidden: false,
          };
          logging.error(msg);
          createNotification(dispatch, notification);
        });
  };

  return (
      userIsAuth && (
          <Popover className="relative bg-white">
            <div
                className="pointer-events-none absolute inset-0 z-30 shadow"
                aria-hidden="true"
            />
            <div className="relative z-20">
              <div
                  className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
                <div>
                  <Link href="/" className="flex">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                  </Link>
                </div>
                <div className="-my-2 -mr-2 md:hidden">
                  <Popover.Button
                      className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                  </Popover.Button>
                </div>
                {/** Desktop **/}
                <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                  <Popover.Group as="nav" className="flex space-x-10">
                    <Popover>
                      <div
                          className={`flex flex-col lg:flex-row justify-center items-center`}
                      >
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:underline mx-4 flex flex-col justify-between rounded-lg  hover:bg-gray-50"
                            >
                              <div className="flex md:flex-col">
                          <span
                              className="inline-flex h-12 w-12 items-center justify-center rounded-md
                                      bg-indigo-500 text-white md:h-0 md:w-0"
                          >
                            <item.icon className="h-4 w-4" aria-hidden="true"/>
                          </span>
                                <div className="ml-4 my-auto md:flex md:flex-col md:justify-between lg:ml-0">
                                  <div>
                                    <p className="text-base font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                        ))}
                      </div>
                    </Popover>
                  </Popover.Group>

                  <div className="flex items-center md:ml-12">
                    <div className={`border-none text-center`}>
                      {process.env.NEXT_PUBLIC_APP_VERSION && (
                          <p className={`text-gray-200 ml-4 `}>
                            v {process.env.NEXT_PUBLIC_APP_VERSION}
                          </p>
                      )}
                    </div>
                    <button
                        onClick={() => signOut()}
                        type="button"
                        className={`cursor-pointer ml-8 inline-flex items-center justify-center rounded-md 
                          border border-transparent bg-indigo-600 px-4 py-2 text-base 
                          font-medium text-white shadow-sm hover:bg-indigo-700`}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/** Mobile **/}
            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
              >
                <div
                    className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pt-5 pb-6 sm:pb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button
                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </Popover.Button>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                      <nav>
                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                          {navigation.map((item) => (
                              <Link
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 flex md:flex-col items-center rounded-lg p-3 hover:bg-gray-50"
                              >
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true"/>
                                </div>
                                <div className="ml-4 text-base font-medium text-gray-900">
                                  {item.name}
                                </div>
                              </Link>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>

                  <div className={`border-none text-center`}>
                    {process.env.NEXT_PUBLIC_APP_VERSION && (
                        <p className={`text-gray-200 ml-4 `}>
                          v {process.env.NEXT_PUBLIC_APP_VERSION}
                        </p>
                    )}
                  </div>

                  <div className="py-6 px-5">
                    <button
                        onClick={() => signOut()}
                        type="button"
                        className="cursor-pointer flex w-full items-center justify-center
                        rounded-md border border-transparent bg-indigo-600 px-4 py-2
                        text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
      )
  );
}
