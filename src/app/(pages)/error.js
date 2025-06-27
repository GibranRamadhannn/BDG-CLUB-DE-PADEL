"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-mercury flex flex-col md:flex-row justify-between items-stretch px-8 py-32 w-full">
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-start max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-stoplight">
          We just double-faulted, but hey—we&apos;re still in the game.
        </h1>
        <div className="flex gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 text-center text-stoplight font-semibold text-md cursor-pointer transition-colors duration-200 px-4 py-2 rounded-2xl bg-white hover:bg-stoplight hover:text-white"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 text-center cursor-pointer text-md font-semibold transition-colors duration-200 text-foreground hover:text-white hover:bg-stoplight px-4 py-2 rounded-2xl bg-white"
          >
            Back to home
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-[300px] md:h-auto relative rounded-xl overflow-hidden">
        <Image
          src="/bdgclubdepadel-flag2.jpg"
          alt="Error Visual"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
