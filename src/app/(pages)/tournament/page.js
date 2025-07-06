"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { fetchTournaments } from "@/app/(pages)/tournament/_lib/tournament";
import TournamentCard from "./_components/TournamentCard";

export default function TournamentPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTournaments();
      setTournaments(data);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <section className="min-h-screen font-[family-name:var(--font-montserrat)] bg-mercury">
      {/* Title & Button Add Tournament*/}
      <div className="pt-36 mb-10 mx-6 flex md:flex-row flex-col justify-start gap-4 w-full md:items-center items-start">
        <h1 className="md:text-4xl text-3xl text-black font-bold font-[family-name:var(--font-roboto)]">
          TOURNAMENTS
        </h1>
        <Link
          href="/tournament/new-tournament"
          className="bg-white text-stoplight border border-stoplight hover:bg-stoplight hover:border-transparent hover:text-white font-medium py-2 px-3 flex justify-between items-center gap-2 rounded-4xl text-md md:text-lg ml-2 cursor-pointer transition-colors duration-300 ease-in-out"
        >
          <PlusIcon className="w-5 h-5" /> New tournament
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center w-full px-6 gap-6">
        {loading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse p-6 bg-gray-300 rounded-2xl flex w-full min-h-[250px]"
            >
              <div className="flex flex-col justify-between w-3/4 gap-6">
                <div className="h-8 w-3/4 bg-gray-400 rounded" />
                <div className="flex flex-wrap gap-8">
                  <div className="w-52 h-16 bg-gray-400 rounded" />
                  <div className="w-52 h-16 bg-gray-400 rounded" />
                </div>
              </div>
              <div className="flex flex-col justify-end items-end w-1/4">
                <div className="w-32 h-10 bg-gray-400 rounded" />
              </div>
            </div>
          ))}

        {!loading && tournaments.length === 0 && (
          <p className="text-lg text-gray-600">No tournaments yet.</p>
        )}

        {!loading &&
          tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              showRegisterButton={false}
            />
          ))}
      </div>
    </section>
  );
}
