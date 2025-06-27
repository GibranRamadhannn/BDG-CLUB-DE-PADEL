"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLink({ href, children, className = "" }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  function NavClass() {
    return `transition-colors flex items-center justify-start gap-2 font-medium font-[family-name:var(--font-geist-mono)] px-4 py-8 block duration-300 ease-in-out
      ${
        isActive
          ? "text-stoplight bg-white/70"
          : "text-white-smoke hover:text-stoplight"
      }
      ${className}
    `;
  }

  return (
    <Link href={href} className={NavClass()}>
      {children}
    </Link>
  );
}
