"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  function NavClass() {
    return `rounded-full transition-colors flex items-center justify-start gap-2 font-[family-name:var(--font-roboto)] h-10 sm:h-12 px-4 sm:px-5 block duration-300 ease-in-out transition uppercase
     ${
       isActive
         ? "text-background bg-stoplight/90"
         : "text-foreground hover:bg-stoplight/80 hover:text-background"
     }
    `;
  }

  return (
    <Link href={href} className={NavClass()}>
      {children}
    </Link>
  );
}
