"use client";
import { usePathname } from "next/navigation";

export default function NavFooter({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  function NavClass() {
    return `transition-colors font-medium font-[family-name:var(--font-geist-mono)] text-2xl md:text-3xl text-start p-2 duration-300 ease-in-out transition uppercase
     ${
       isActive
         ? "text-stoplight/80 hover:text-foreground"
         : "text-foreground hover:text-stoplight/80"
     }
    `;
  }

  return (
    <a href={href} className={NavClass()}>
      {children}
    </a>
  );
}
