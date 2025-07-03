"use client";

import Image from "next/image";

export default function PlayerCard({ players, community, index }) {
  return (
    <div className="p-2">
      <div className="flex justify-between items-center w-full border border-gray-300 rounded-xl px-4 py-4">
        {/* Index */}
        <div className="pr-4 border-r border-gray-400 h-full flex items-center">
          <p className="text-lg font-semibold">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>

        {/* Players */}
        <div className="flex flex-col gap-4 flex-1 px-4">
          {players.map((player, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={player.photo || "/default-avatar.png"}
                  alt={player.nickname || "Player"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium leading-tight">
                  {player.full_name}
                </p>
                <p className="text-sm text-gray-500 leading-tight">
                  @{player.instagram}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Community */}
        <div className="text-right min-w-[120px] self-stretch flex items-center">
          <p className="text-sm font-semibold text-gray-700">{community}</p>
        </div>
      </div>
    </div>
  );
}
