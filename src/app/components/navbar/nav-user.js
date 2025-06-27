import {
  UserIcon,
  LogOutIcon,
  LogInIcon,
  CircleUserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const itemClass =
  "block w-full flex justify-start items-center gap-2 text-left px-4 py-3 hover:bg-white-smoke cursor-pointer hover:border-stoplight hover:text-stoplight hover:border-b border-paternoster/50 text-foreground/90 border-b cursor-pointer";

export default function NavUser() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLoggedIn = status === "authenticated";

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 bg-white cursor-pointer hover:bg-stoplight text-stoplight hover:text-white transition-colors duration-300"
      >
        <UserIcon size={25} />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-3xs bg-white rounded-xl shadow-lg z-50 transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="py-2 px-1 space-y-1">
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/account" className={itemClass}>
                  <CircleUserRoundIcon size={17} /> My Account
                </Link>
              </li>
              <li>
                <button onClick={() => signOut()} className={itemClass}>
                  <LogOutIcon size={17} /> Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => signIn()} className={itemClass}>
                <LogInIcon size={17} /> Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
