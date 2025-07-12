"use client";

// import {
//   SingleEliminationBracket,
//   Match,
// } from "@g-loot/react-tournament-brackets";

// const match = {
//   id: "1",
//   name: "Final",
//   nextMatchId: null,
//   tournamentRoundText: "Final",
//   startTime: "2025-07-11",
//   state: "DONE",
//   participants: [
//     { id: "1", resultText: "W", isWinner: true, name: "Team A" },
//     { id: "2", resultText: "L", isWinner: false, name: "Team B" },
//   ],
// };

export default function BracketContent() {
  return (
    // <div className="p-4 w-full overflow-x-auto font-mono">
    //   <div className="relative flex justify-start items-stretch space-x-32 w-full h-full bg-blue-200 p-2">
    //     {/* === Garis antar kolom === */}
    //     {/* Round 1 ke Semifinal */}
    //     <div className="absolute left-[600px] top-[70px] w-16 h-0.5 bg-black" />
    //     <div className="absolute left-[336px] top-[70px] w-0.5 h-[140px] bg-black" />

    //     <div className="absolute left-[272px] top-[380px] w-16 h-0.5 bg-black" />
    //     <div className="absolute left-[336px] top-[380px] w-0.5 h-[-140px] bg-black" />

    //     {/* Semifinal ke Final */}
    //     <div className="absolute left-[592px] top-[155px] w-16 h-0.5 bg-black" />
    //     <div className="absolute left-[656px] top-[155px] w-0.5 h-[140px] bg-black" />

    //     <div className="absolute left-[592px] top-[465px] w-16 h-0.5 bg-black" />
    //     <div className="absolute left-[656px] top-[465px] w-0.5 h-[-140px] bg-black" />

    //     {/* ROUND 1 */}
    //     <div className="space-y-8 bg-green-200 min-w-sm">
    //       {[...Array(4)].map((_, i) => (
    //         <MatchCard key={i} />
    //       ))}
    //     </div>

    //     {/* SEMIFINAL */}
    //     <div className="flex justify-center items-center bg-green-100 p-1 min-w-sm">
    //       <div className="bg-red-200 w-full space-y-8">
    //         {[...Array(2)].map((_, i) => (
    //           <MatchCard key={i} />
    //         ))}
    //       </div>
    //     </div>

    //     {/* FINAL */}
    //     <div className="flex justify-center items-center bg-green-100 p-1 min-w-sm">
    //       <div className="bg-red-200 w-full space-y-8">
    //         <MatchCard />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="p-4 overflow-x-auto">
      {/* <SingleEliminationBracket match={match} matchComponent={Match} /> */}
    </div>
  );
}

function MatchCard() {
  return (
    <div className="bg-white border border-gray-400 p-2 rounded-3xl text-center shadow flex flex-col justify-between items-center gap-4">
      {/* Top Team */}
      <div className="p-1 flex justify-between items-center w-full space-x-12">
        <div className="flex flex-col justify-start items-center gap-1">
          <p>Padel Ngasal</p>
          <p>Padel Ngasal</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <p>0</p>
          <p>2</p>
          <p>3</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-300" />

      {/* Bottom Team */}
      <div className="p-1 flex justify-between items-center w-full space-x-12">
        <div className="flex flex-col justify-start items-center gap-1">
          <p>Padel Ngasal</p>
          <p>Padel Ngasal</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <p>0</p>
          <p>2</p>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}
