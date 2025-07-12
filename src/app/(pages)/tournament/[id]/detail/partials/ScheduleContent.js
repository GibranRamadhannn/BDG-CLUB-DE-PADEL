"use client";
import React from "react";

function renderBox({ court, time, teams }) {
  const bgColor =
    court === "Court 1"
      ? "bg-dried-goldenrod/95"
      : court === "Court 2"
      ? "bg-fanatic-fuchsia/95"
      : "bg-white";
  return (
    <div className={`rounded-xl px-3 py-2 text-umbra ${bgColor}`}>
      <p className="text-xs font-semibold capitalize text-center mb-4">
        {court} - {time}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {teams.map(([title, value], index) => (
          <React.Fragment key={index}>
            <p className="text-sm font-semibold capitalize text-start">
              {title}
            </p>
            <p className="text-sm font-medium capitalize text-end text-white">{value}</p>
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
      teams: [
        ["PADEL NGASAL", 0],
        ["PADEL POP", 0],
      ],
    },
    {
      court: "Court 2",
      time: "15.00 WIB",
      teams: [
        ["SOLUNAR", 0],
        ["PADEL PISAN", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["FPC", 0],
        ["BELAJAR PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["THE PADEL HUB", 0],
        ["HARI HARI PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["PPPADEL", 0],
        ["127 PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["NONSTOP PADEL", 0],
        ["PAGI-PAGI", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["BCDP B", 0],
        ["BCDP A", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["NYOBAIN PADEL", 0],
        ["BAIKO PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["PADEL NGASAL", 0],
        ["SOLUNAR", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["PADEL POP", 0],
        ["PADEL PISAN", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["FPC", 0],
        ["THE PADEL HUB", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["BELAJAR PADEL", 0],
        ["HARI-HARI PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["PPPADEL", 0],
        ["NONSTOP PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["127 PADEL", 0],
        ["PAGI-PAGI", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["BCDP B", 0],
        ["NYOBAIN PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["BCDP A", 0],
        ["BAIKO PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["PADEL NGASAL", 0],
        ["PADEL PISAN", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["PADEL POP", 0],
        ["SOLUNAR", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["FPC", 0],
        ["HARI-HARI PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["BELAJAR PADEL", 0],
        ["THE PADEL HUB", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["PPPADEL", 0],
        ["PAGI-PAGI", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
      teams: [
        ["127 PADEL", 0],
        ["NONSTOP PADEL", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED",
      teams: [
        ["BCDP B", 0],
        ["BAIKO PADEL", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED",
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
        ["WINNER GROUP A", 0],
        ["RUNNER UP GROUP B", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED (QF2)",
      teams: [
        ["WINNER GROUP B", 0],
        ["RUNNER UP GROUP A", 0],
      ],
    },
    {
      court: "Court 1",
      time: "FOLLOWED (QF3)",
      teams: [
        ["WINNER GROUP C", 0],
        ["RUNNER UP GROUP D", 0],
      ],
    },
    {
      court: "Court 2",
      time: "FOLLOWED (QF4)",
      teams: [
        ["WINNER GROUP D", 0],
        ["RUNNER UP GROUP C", 0],
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
      <div className="grid grid-cols-2 gap-2">
        {/* Group Qualification */}
        <div className="p-2">
          <h2 className="text-2xl font-bold capitalize text-center mb-4">
            Group Qualification
          </h2>
          <div className="grid grid-cols-2 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
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
            <div className="grid grid-cols-2 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
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
            <div className="grid grid-cols-2 gap-2 w-full p-2 bg-silver-medal/80 rounded-2xl">
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
