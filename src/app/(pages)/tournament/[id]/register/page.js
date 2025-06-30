"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTournamentById } from "../../_lib/tournament";
import TournamentCard from "../../_components/TournamentCard";
import FormPlayerRegisterTournament from "../../_components/TournamentPlayerRegisterForm";

export default function RegisterTournamentPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTournament = async () => {
      const data = await fetchTournamentById(id);
      setTournament(data);
      setLoading(false);
    };

    if (id) getTournament();
  }, [id]);

  return (
    <section className="min-h-screen font-[family-name:var(--font-montserrat)] bg-mercury">
      {/* Tournament Card */}
      <div className="flex flex-col justify-center items-center w-full pt-36 mb-5 px-6 gap-6">
        {loading && (
          <div className="animate-pulse p-6 bg-gray-300 rounded-2xl flex w-full min-h-[250px]">
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
        )}

        {!loading && tournament && (
          <TournamentCard tournament={tournament} showRegisterButton={false} />
        )}

        {!loading && !tournament && (
          <p className="text-lg text-red-500">Tournament not found.</p>
        )}
      </div>

      {/* Title */}
      <div className="px-6 w-full">
        <h1 className="md:text-4xl text-3xl mb-5 text-black font-bold font-[family-name:var(--font-roboto)]">
          PLAYER REGISTER
        </h1>
      </div>

      {/* Register Form */}
      <div className="flex justify-center items-start w-full px-6 mb-5">
        <div className="p-5 w-full bg-white">
          <FormPlayerRegisterTournament />
        </div>
      </div>
    </section>
  );
}
