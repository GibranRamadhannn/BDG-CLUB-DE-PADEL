"use client";

import {
  X,
  UserIcon,
  LogOutIcon,
  LogInIcon,
  CircleUserRoundIcon,
  HouseIcon,
  TrophyIcon,
  Calendar1Icon,
  HeadsetIcon,
} from "lucide-react";
import NavLinkDrawer from "./nav-link-drawer";
import { BackgroundBeams } from "../ui/background-beams";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavDrawer({ isOpen, onClose }) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const itemClass =
    "block w-full flex justify-start items-center gap-2 border-b text-xl px-4 py-8 font-medium font-[family-name:var(--font-geist-mono)] hover:text-stoplight text-white-smoke hover:border-stoplight duration-300 ease-in-out transition-colors cursor-pointer";

  return (
    <>
      {/* ========== Drawer :begin ==========
      * isOpen = translate-x-0
      * isClose = translate-x-full
      ======================================= */}
      <div
        className={`fixed md:hidden top-0 left-0 w-screen h-screen z-[999] transition-transform duration-700 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Button Close :begin => onClick = {onClose} */}
        <div className="relative z-10 flex justify-end p-4">
          <button
            onClick={onClose}
            className="rounded-full bg-stoplight/80 p-2 cursor-pointer hover:bg-white/70 hover:text-stoplight text-white"
          >
            <X className="w-6 h-6 transition-colors duration-500 ease-in-out" />
          </button>
        </div>
        {/* Button Close :end => onClick = {onClose} */}

        {/* Drawer Menu :begin */}
        <div className="relative z-10 mt-10 text-3xl font-semibold text-center">
          {isLoggedIn && (
            <NavLinkDrawer href="/account" className="border-b text-xl">
              <CircleUserRoundIcon size={17} /> My Account
            </NavLinkDrawer>
          )}
          <NavLinkDrawer href="/" className="border-b text-xl">
            <HouseIcon size={17} /> Home
          </NavLinkDrawer>
          <NavLinkDrawer
            href={`/tournament/1/detail`}
            className="border-b text-xl"
          >
            <TrophyIcon size={17} /> Tournament
          </NavLinkDrawer>
          <NavLinkDrawer href="/event" className="border-b text-xl">
            <Calendar1Icon size={17} /> Event
          </NavLinkDrawer>
          <NavLinkDrawer href="/contact" className="border-b text-xl">
            <HeadsetIcon size={17} /> Contact
          </NavLinkDrawer>
          {isLoggedIn ? (
            <button onClick={() => signOut()} className={itemClass}>
              <LogOutIcon size={17} /> Log Out
            </button>
          ) : (
            <button onClick={() => signIn()} className={itemClass}>
              <LogInIcon size={17} /> Login
            </button>
          )}
        </div>
        {/* Drawer Menu :end */}

        {/* Background Beams */}
        <BackgroundBeams className="absolute z-[-1] h-full w-full bg-neutral-950" />
        {/* <BackgroundBeams className="z-0 h-screen" /> */}
      </div>
      {/* ========== Drawer :end ========== */}
    </>
  );
}
