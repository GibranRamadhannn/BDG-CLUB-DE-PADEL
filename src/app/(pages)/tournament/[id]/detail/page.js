"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTournamentById } from "../../_lib/tournament";
import TournamentCard from "../../_components/TournamentCard";
import PlayerCard from "../../_components/PlayerCard";
import { AnimatePresence, motion } from "framer-motion";

export default function DetailTournamentPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlayerList, setShowPlayerList] = useState(false);

  useEffect(() => {
    const getTournament = async () => {
      const data = await fetchTournamentById(id);
      setTournament(data);
      setLoading(false);
    };

    if (id) getTournament();
  }, [id]);

  const togglePlayerList = () => {
    setShowPlayerList((prev) => !prev);
  };

  const groupPlayersByTwo = (players) => {
    const result = [];
    for (let i = 0; i < players.length; i += 2) {
      result.push(players.slice(i, i + 2));
    }
    return result;
  };

  return (
    <section className="min-h-screen font-[family-name:var(--font-montserrat)] bg-mercury">
      {/* Tournament Card */}
      <div className="flex flex-col justify-center items-center w-full pt-36 mb-6 px-6 gap-6">
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

      {/* Player List Toggle */}
      <div className="px-6 w-full flex justify-start items-center gap-5">
        <div
          onClick={togglePlayerList}
          className={`p-5 rounded-3xl text-center cursor-pointer transition-colors duration-300 font-[family-name:var(--font-roboto)] font-bold md:text-lg text-md ${
            showPlayerList
              ? "bg-after-shock text-black"
              : "bg-black text-white hover:bg-after-shock hover:text-black"
          }`}
        >
          <p>PLAYER LIST</p>
        </div>
      </div>

      {/* Player Cards */}
      <AnimatePresence>
        {showPlayerList && tournament?.tournament_players?.length > 0 && (
          <motion.div
            key="player-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-6 px-6 w-full pb-5"
          >
            <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center">
              <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                {groupPlayersByTwo(tournament.tournament_players).map(
                  (group, idx) => (
                    <PlayerCard
                      key={idx}
                      index={idx}
                      players={group.map((g) => g.player)}
                      community={group[0].player.community}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPlayerList && tournament?.tournament_players?.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No players registered.</p>
      )}
    </section>
  );
}
