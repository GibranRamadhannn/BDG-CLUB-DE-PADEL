"use client";
import React from "react";

function renderBox({ court, time, teams, group }) {
  const bgColor =
    court === "Court 1"
      ? "bg-dried-goldenrod/95"
      : court === "Court 2"
      ? "bg-fanatic-fuchsia/95"
      : "bg-white";

  return (
    <div className={`rounded-xl px-3 py-2 text-umbra ${bgColor}`}>
      <div className="flex justify-between items-center w-full mb-4">
        <p className="text-xs font-medium capitalize text-center">
          {court} - {time}
        </p>
        {group && (
          <div className="bg-effervescent-blue/80 py-1 px-2 rounded-xl text-white">
            <p className="text-xs font-mono capitalize text-center">
              Group {group}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {teams.map(([title, value], index) => (
          <React.Fragment key={index}>
            <p className="text-sm font-semibold capitalize text-start">
              {title}
            </p>
            <p className="text-sm font-medium capitalize text-end text-white">
              {value}
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function ScheduleContent() {
  const groupQualificationData = [
    {
      court: "Court 1",
      time: "15.00 WIB",
      group: "A",
      teams: [
        ["PADEL NGASAL", 1],
        ["PADEL POP", 3],
      ],
    },
    {
      court: "Court 2",
      time: "15.00 WIB",
      group: "A",
      teams: [
        ["SOLUNAR", 3],
        ["PADEL PISAN", 1],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "B",
      teams: [
        ["FPC", 2],
        ["BELAJAR PADEL", 2],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "B",
      teams: [
        ["THE PADEL HUB", 3],
        ["HARI HARI PADEL", 1],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "C",
      teams: [
        ["PPPADEL", 2],
        ["127 PADEL", 2],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "C",
      teams: [
        ["NONSTOP PADEL", 1],
        ["PAGI-PAGI", 3],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "D",
      teams: [
        ["BCDP B", 3],
        ["BCDP A", 1],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "D",
      teams: [
        ["NYOBAIN PADEL", 2],
        ["BAIKO PADEL", 2],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "A",
      teams: [
        ["PADEL NGASAL", 1],
        ["SOLUNAR", 3],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "A",
      teams: [
        ["PADEL POP", 4],
        ["PADEL PISAN", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "B",
      teams: [
        ["FPC", 0],
        ["THE PADEL HUB", 4],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "B",
      teams: [
        ["BELAJAR PADEL", 4],
        ["HARI-HARI PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "C",
      teams: [
        ["PPPADEL", 3],
        ["NONSTOP PADEL", 1],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "C",
      teams: [
        ["127 PADEL", 3],
        ["PAGI-PAGI", 1],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "D",
      teams: [
        ["BCDP B", 3],
        ["NYOBAIN PADEL", 1],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "D",
      teams: [
        ["BCDP A", 1],
        ["BAIKO PADEL", 3],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "A",
      teams: [
        ["PADEL NGASAL", 2],
        ["PADEL PISAN", 2],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "A",
      teams: [
        ["PADEL POP", 1],
        ["SOLUNAR", 3],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "B",
      teams: [
        ["FPC", 3],
        ["HARI-HARI PADEL", 1],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "B",
      teams: [
        ["BELAJAR PADEL", 1],
        ["THE PADEL HUB", 3],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "C",
      teams: [
        ["PPPADEL", 1],
        ["PAGI-PAGI", 3],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "C",
      teams: [
        ["127 PADEL", 4],
        ["NONSTOP PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      group: "D",
      teams: [
        ["BCDP B", 0],
        ["BAIKO PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      group: "D",
      teams: [
        ["BCDP A", 0],
        ["NYOBAIN PADEL", 0],
      ],
    },
  ];

  const quarterFinalData = [
    {
      court: "Court 1",
      time: "FOLLOWED (QF1)",
      teams: [
        ["SOLUNAR", 0],
        ["BELAJAR PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED (QF2)",
      teams: [
        ["THE PADEL HUB", 0],
        ["PADEL POP", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED (QF3)",
      teams: [
        ["127 PADEL", 0],
        ["NYOBAIN PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED (QF4)",
      teams: [
        ["BCDP B", 0],
        ["PAGI-PAGI", 0],
      ],
    },
  ];

  const semiFinalData = [
    {
      court: "Court 1",
      time: "FOLLOWED (SF1)",
      teams: [
        ["WINNER QF-1", 0],
        ["WINNER QF-3", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED (SF2)",
      teams: [
        ["WINNER QF-2", 0],
        ["WINNER QF-4", 0],
      ],
    },
  ];

  const thirdPlaceData = [
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["LOSE SF-1", 0],
        ["LOSE SF-2", 0],
      ],
    },
  ];

  const finalData = [
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["WINNER SF-1", 0],
        ["WINNER SF-2", 0],
      ],
    },
  ];

  return (
    <div className="p-2 w-full gap-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Group Qualification */}
        <div className="p-2">
          <h2 className="text-2xl font-bold capitalize text-center mb-4">
            Group Qualification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
            {groupQualificationData.map((titlePairs, idx) => (
              <div key={idx}>{renderBox(titlePairs)}</div>
            ))}
          </div>
        </div>

        <div>
          {/* Quarter Final */}
          <div className="p-2">
            <h2 className="text-2xl font-bold capitalize text-center mb-4">
              Quarter Final
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
              {quarterFinalData.map((titlePairs, idx) => (
                <div key={idx}>{renderBox(titlePairs)}</div>
              ))}
            </div>
          </div>

          {/* Semi Final */}
          <div className="p-2">
            <h2 className="text-2xl font-bold capitalize text-center mb-4">
              Semi Final
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
              {semiFinalData.map((titlePairs, idx) => (
                <div key={idx}>{renderBox(titlePairs)}</div>
              ))}
            </div>
          </div>

          {/* Third Place */}
          <div className="p-2">
            <h2 className="text-2xl font-bold capitalize text-center mb-4">
              Third Place
            </h2>
            <div className="grid grid-cols-1 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
              {thirdPlaceData.map((titlePairs, idx) => (
                <div key={idx}>{renderBox(titlePairs)}</div>
              ))}
            </div>
          </div>

          {/* Final */}
          <div className="p-2">
            <h2 className="text-2xl font-bold capitalize text-center mb-4">
              Final
            </h2>
            <div className="grid grid-cols-1 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
              {finalData.map((titlePairs, idx) => (
                <div key={idx}>{renderBox(titlePairs)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
