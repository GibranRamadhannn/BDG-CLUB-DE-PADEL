"use client";

import NavLink from "../navbar/nav-link";
import NavDrawer from "../navbar/nav-drawer";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import NavUser from "./nav-user";

export default function NavbarTop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer-section");
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      const isScrolled = window.scrollY > 0;
      const nearFooter = footerTop <= windowHeight;

      setIsNearFooter(isScrolled && nearFooter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLogo = isNearFooter ? "/logo-2.png" : "/logo-1.png";
  const navLogoClass = isNearFooter
    ? "object-contain dark:invert"
    : "object-contain";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-3 flex items-center justify-between font-[family-name:var(--font-montserrat)] backdrop-blur-sm transition-all ease-in-out duration-300 ${
        isNearFooter
          ? "bg-black"
          : "bg-transparent text-black border-b border-white"
      }`}
    >
      {/* ========== Navbar Logo :begin ========== */}
      <div className="relative w-23 md:w-30 h-auto aspect-[3/2] transition-colors duration-300">
        <Image
          src={navLogo}
          alt="BDGCLUBDEPADEL Logo"
          className={`${navLogoClass} transition-all duration-300 ease-in-out`}
          fill
          priority
        />
      </div>
      {/* ========== Navbar Logo :end ========== */}

      {/* ========== Navbar Links :begin ========== */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-4 font-semibold text-sm bg-white rounded-4xl p-1">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/tournament">Tournament</NavLink>
        <NavLink href="/event">Event</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <NavLink href="/match">Match</NavLink>
      </div>
      {/* ========== Navbar Links :end ========== */}

      {/* Drawer Button */}
      <div className="flex items-center gap-2">
        {/* Drawer Button (Dekstop) */}
        <div className="hidden md:flex flex-shrink-0 font-semibold p-1">
          <NavUser />
        </div>

        {/* Drawer Button (Mobile) */}
        <div className="md:hidden flex-shrink-0">
          <button onClick={() => setIsMenuOpen(true)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 transition duration-500 ease-in-out hover:text-stoplight cursor-pointer" />
            ) : (
              <Menu className="w-6 h-6 transition duration-500 ease-in-out hover:text-stoplight cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* NavDrawer (Mobile) */}
      <NavDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}
