"use client";

import Link from "next/link";
import { MapPinnedIcon, PlusIcon, TrophyIcon } from "lucide-react";

export default function TournamentCard({
  tournament,
  showRegisterButton = false,
}) {
  return (
    <div className="p-6 bg-[url('/wintery-sunburst.svg')] bg-cover bg-center rounded-2xl text-white flex w-full min-h-[250px]">
      <div className="flex flex-col justify-between w-3/4 gap-8">
        <div>
          <h1 className="text-3xl font-bold font-roboto mb-2 text-[#faf1b3]">
            {tournament.name}
          </h1>
          <h2 className="text-xl font-semibold font-roboto">
            {tournament.organizer}
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 bg-after-shock mx-1 py-2 px-6 rounded-3xl w-fit">
          <div className="flex items-center gap-3">
            <TrophyIcon className="w-8 h-8 text-foreground" />
            <div className="flex flex-col">
              <span className="text-md font-semibold font-roboto text-foreground">
                Total Grand Prize
              </span>
              <span className="text-xl font-bold font-roboto text-exotic-liras">
                Rp. {parseInt(tournament.grand_prize).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPinnedIcon className="w-8 h-8 text-foreground" />
            <div className="flex flex-col">
              <span className="text-md font-semibold font-roboto text-foreground">
                Venue Name
              </span>
              <span className="text-xl font-bold font-roboto text-exotic-liras">
                {tournament.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showRegisterButton && (
        <div className="flex flex-col justify-end items-end w-1/4">
          <Link
            href={`/tournament/${tournament.id}/register`}
            className="bg-casino-lights text-rouge-sardes/70 border border-rouge-sardes hover:bg-rouge-sardes/90 hover:border-transparent hover:text-casino-lights font-medium py-2 px-3 flex items-center gap-2 rounded-4xl text-md transition-colors duration-300"
          >
            <PlusIcon className="w-5 h-5" /> Register
          </Link>
        </div>
      )}
    </div>
  );
}
