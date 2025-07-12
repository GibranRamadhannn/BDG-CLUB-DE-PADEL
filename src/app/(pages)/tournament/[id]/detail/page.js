"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTournamentById } from "../../_lib/tournament";
import TournamentCard from "../../_components/TournamentCard";
import PlayerCard from "../../_components/PlayerCard";
import { AnimatePresence, motion } from "framer-motion";
import DrawsContent from "./partials/DrawsContent";

export default function DetailTournamentPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const getTournament = async () => {
      const data = await fetchTournamentById(id);
      setTournament(data);
      setLoading(false);
    };

    if (id) getTournament();
  }, [id]);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
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

      {/* Tab Buttons */}
      <div className="px-6 w-full flex justify-start items-center overflow-auto gap-3 pb-3">
        {[
          { key: "draws", label: "DRAWS" },
          { key: "results", label: "RESULTS" },
          { key: "playerList", label: "PLAYER LIST" },
          { key: "overview", label: "OVERVIEW" },
        ].map(({ key, label }) => (
          <div
            key={key}
            onClick={() => toggleSection(key)}
            className={`px-5 py-3 rounded-2xl text-center cursor-pointer transition-colors duration-300 font-[family-name:var(--font-roboto)] font-bold md:text-lg text-sm text-nowrap ${
              activeSection === key
                ? "bg-after-shock text-black"
                : "bg-black text-white hover:bg-after-shock hover:text-black"
            } w-full md:w-auto`}
          >
            <p>{label}</p>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence>
        {activeSection === "playerList" &&
          tournament?.tournament_players?.length > 0 && (
            <motion.div
              key="player-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-6 px-6 w-full pb-5"
            >
              <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center">
                <div className="p-4 grid lg:grid-cols-2 grid-cols-1 gap-1 w-full">
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

        {activeSection === "draws" && (
          <motion.div
            key="draws"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-6 px-6 w-full pb-5"
          >
            <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center">
              <DrawsContent tournament={tournament} />
            </div>
          </motion.div>
        )}

        {activeSection === "overview" && (
          <motion.div
            key="overview"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-6 px-6 w-full pb-5"
          >
            <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center">
              <h2 className="text-3xl font-bold capitalize">COMING SOON</h2>
            </div>
          </motion.div>
        )}

        {activeSection === "results" && (
          <motion.div
            key="results"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-6 px-6 w-full pb-5"
          >
            <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center">
              <h2 className="text-3xl font-bold capitalize">COMING SOON</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback if playerList empty */}
      {activeSection === "playerList" &&
        tournament?.tournament_players?.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No players registered.
          </p>
        )}
    </section>
  );
}
