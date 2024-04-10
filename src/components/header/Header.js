"use client";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  PencilSquareIcon,
  PlusCircleIcon,
  XMarkIcon,
  PhotoIcon,
  EnvelopeIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import styles from "./header.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const products = [
  {
    name: "Write Blog",
    description: "Insightful tips, and destination guides",
    href: "/posts/write",
    icon: PencilSquareIcon,
  },
  {
    name: "Add Package",
    description: "Post packages you want to feature",
    href: "/packages/new",
    icon: PlusCircleIcon,
  },
  {
    name: "Add Place",
    description: "Places you want to feature",
    href: "/places/new",
    icon: PlusCircleIcon,
  },

  {
    name: "Add Activities",
    description: "Activities you want to feature",
    href: "/activities/new",
    icon: PlusCircleIcon,
  },

  {
    name: "Add Image",
    description: "Images you want to feature in gallery",
    href: "/gallery/new",
    icon: PhotoIcon,
  },
];
const callsToAction = [
  {
    name: "Customer Enquiries",
    href: "/admin/manage/enquiries",
    icon: EnvelopeIcon,
  },
  { name: "Manage Blogs", href: "/admin/manage/blogs", icon: ListBulletIcon },
  {
    name: "Manage Packages",
    href: "/admin/manage/packages",
    icon: ListBulletIcon,
  },

  {
    name: "Manage Activities",
    href: "/admin/manage/activities",
    icon: ListBulletIcon,
  },
  {
    name: "Manage Gallery",
    href: "/admin/manage/gallery",
    icon: PhotoIcon,
  },
  {
    name: "Manage Places",
    href: "/admin/manage/places",
    icon: ListBulletIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const session = useSession();
  const { status } = session;

  return (
    <header className={styles.container}>
      <div className="w-full wrapper">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image src={"/logo.png"} alt="logo" height={100} width={140} />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/packages"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Packages
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Blogs
            </Link>
            <Link
              href="/gallery"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Contact Us
            </Link>

            {status === "authenticated" &&
            session?.data?.user?.role === "ADMIN" ? (
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Admin
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md  rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon
                              className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <Link
                              href={item.href}
                              className="block font-semibold text-gray-900"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-1 text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {callsToAction.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center  gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon
                            className="h-5 w-5 flex-none text-gray-400"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <></>
            )}
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {status === "authenticated" ? (
              <span
                onClick={signOut}
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              >
                Logout <span aria-hidden="true">&rarr;</span>
              </span>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image src={"/logo.png"} alt="logo" height={100} width={140} />

                {/* <div className={styles.logo}>Wander Wild Adventures</div> */}
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {status === "authenticated" &&
                  session?.data?.user?.role === "ADMIN" ? (
                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Admin
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products, ...callsToAction].map((item) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <></>
                  )}

                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    href="/packages"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Packages
                  </Link>
                  <Link
                    href="/blogs"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/gallery"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="py-6">
                  {status === "authenticated" ? (
                    <span
                      onClick={signOut}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                      Logout
                    </span>
                  ) : (
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </header>
  );
}
