"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import MatchCarousel from "@/app/components/match/MatchCarousel";
import { useState } from "react";
import CountUp from "react-countup";
import { useSession } from "next-auth/react";

export default function MatchPage() {
  const [totalMatch, setTotalMatch] = useState(0);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)] bg-mercury">
      {/* Title & Button Add Match*/}
      <div className="pt-36 mb-10 mx-6 flex justify-start gap-4 w-full items-center">
        <h1 className="md:text-4xl text-3xl text-black font-bold font-[family-name:var(--font-roboto)]">
          PADEL <span className="text-stoplight">MATCH</span>
        </h1>
        {isLoggedIn && (
          <Link
            href="/match/new-match"
            className="bg-white text-stoplight border border-stoplight hover:bg-stoplight hover:border-transparent hover:text-white font-medium py-2 px-3 flex justify-between items-center gap-2 rounded-4xl text-md md:text-lg ml-2 cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <PlusIcon className="w-5 h-5" /> New match
          </Link>
        )}
      </div>

      {/* Matches */}
      <div className="bg-white border border-paternoster/60 p-5">
        <div className="w-full flex justify-between items-center">
          <h1 className="md:text-2xl text-lg text-stoplight font-semibold font-[family-name:var(--font-roboto)] mx-4">
            MATCHES
          </h1>

          <div className="flex justify-center items-center">
            <h1 className="md:text-xl text-lg text-foreground font-semibold font-[family-name:var(--font-roboto)] mx-4">
              Total matches
            </h1>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground">
              <p className="text-md font-semibold text-white">
                <CountUp end={totalMatch} duration={2} />
              </p>
            </div>
          </div>
        </div>

        <MatchCarousel onTotalChange={setTotalMatch} />
      </div>
    </div>
  );
}
