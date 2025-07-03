"use client";

import Image from "next/image";

export default function PlayerCard({ players, community, index }) {
  return (
    <div className="p-1 border-b border-after-shock font-[family-name:var(--font-montserrat)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full h-full px-4 py-3 gap-4">
        {/* Index */}
        <div className="w-full h-full md:w-auto flex justify-center md:justify-start items-center border-b md:border-b-0 md:border-r border-paternoster p-4">
          <p className="text-lg font-semibold">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>

        {/* Players */}
        <div className="flex flex-col gap-4 flex-1 px-0 md:px-4 py-2 w-full">
          {players.map((player, idx) => (
            <div key={idx} className="flex items-center gap-4 p-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={player.photo || defaultAvatar}
                  alt={player.nickname || "Player"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-md font-medium leading-tight">
                  {player.full_name}
                </p>
                <p className="text-md text-gray-500 leading-tight">
                  @{player.instagram}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Community */}
        <div className="w-full md:w-auto flex justify-center md:justify-end items-center p-3">
          <p className="text-md font-semibold text-gray-700 uppercase">
            {community}
          </p>
        </div>
      </div>
    </div>
  );
}
