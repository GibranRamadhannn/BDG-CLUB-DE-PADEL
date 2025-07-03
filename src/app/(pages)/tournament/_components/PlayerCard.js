"use client";

import Image from "next/image";

export default function PlayerCard({ players, community, index }) {
  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full border border-gray-300 rounded-xl px-4 py-4">
        {/* Index */}
        <div className="md:pr-4 md:border-r md:border-gray-400 w-full md:w-auto flex items-center mb-4 md:mb-0">
          <p className="text-lg font-semibold">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>

        {/* Players */}
        <div className="flex flex-col gap-4 flex-1 px-0 md:px-4">
          {players.map((player, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={player.photo || defaultAvatar}
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
        <div className="w-full pt-4 mt-4 border-t border-gray-200 md:border-0 md:mt-0 md:pt-0 md:text-right md:min-w-[120px] flex items-center justify-between md:justify-end">
          <p className="text-sm font-semibold text-gray-700">{community}</p>
        </div>
      </div>
    </div>
  );
}
