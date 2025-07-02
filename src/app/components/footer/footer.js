"use client";
import Image from "next/image";
import NavFooter from "./nav-footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FooterSection({ id }) {
  return (
    <section
      id={id}
      className="relative isolate min-h-[640px] scroll-mt-20 font-[family-name:var(--font-montserrat)] bg-white flex justify-between flex-col"
    >
      {/* Main Items ::begin */}
      <div className="px-6 sm:px-10 mt-10 flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="flex lg:flex-col flex-row flex-wrap items-center gap-6 w-full lg:w-auto">
          <div className="relative w-36 md:w-48 h-auto aspect-[3/2] transition-colors duration-500">
            <Image
              src="/logo-1.png"
              alt="BDGCLUBDEPADEL Logo"
              className="object-contain"
              fill
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
          <NavFooter href="/">Home</NavFooter>
          <NavFooter href="/tournament">Tournament</NavFooter>
          <NavFooter href="/event">Event</NavFooter>
          <NavFooter href="/contact">Contact</NavFooter>
        </div>
      </div>
      {/* Main Items ::end */}

      {/* Sponsor ::begin */}
      <div className="px-6 sm:px-10 py-10 border-t border-silver-medal">
        <h2 className="text-cavernous/90 font-semibold text-md text-center mb-6">
          Our sponsor
        </h2>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/brodo/brodo_black_logo.png"
              alt="BRODO Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/kai/kai_3.png"
              alt="KAI Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/narrow/narrow_5.PNG"
              alt="NARROW Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/teh_dia.png"
              alt="TEH DIA Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/ejuice/juicenation_logo_1.png"
              alt="JUICENATION Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/northwood/northwood_9.png"
              alt="NORTHWOOD Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/komodo/komodo_1.PNG"
              alt="KOMODO Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/sawargi/sawargi_1.PNG"
              alt="SAWARGI Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className=" flex justify-center items-center rounded-lg w-full">
            <Image
              src="/sponsor_logo/isola/isola_black.png"
              alt="ISOLA Logo"
              className="object-contain"
              width={150}
              height={150}
              priority
            />
          </div>
        </div>
      </div>
      {/* Sponsor ::end */}

      {/* Additional Items ::begin */}
      <div className="px-6 sm:px-10 py-4 md:py-6 flex flex-col md:flex-row text-center gap-2 md:justify-between md:items-center border-t border-silver-medal">
        <h3 className="text-cavernous/80 font-medium text-xs">
          Privacy Policy | Cookie Policy
        </h3>
        <a
          href="https://www.instagram.com/bdg.clubdepadel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          className="text-cavernous/70 font-medium text-xs hover:text-stoplight"
        >
          @bdg.clubdepadel
        </a>
        <h3 className="text-cavernous/70 font-medium text-xs">
          BDGCLUBDEPADEL 2025 | Developed by ISOLA
        </h3>
      </div>
      {/* Additional Items ::end */}
    </section>
  );
}
