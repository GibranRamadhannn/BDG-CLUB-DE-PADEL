import { MatchFormatCardHover } from "./MatchFormatCardHover";

export default function MatchFormat({ selectedId, onSelect, hasError = false }) {
  const formats = [
    {
      id: "standard",
      title: "Standard",
      description:
        "The OG, the main event! Think of it like the Grand Slam of padel. You and your fixed partner are locked in, no switching up.",
    },
    {
      id: "americano",
      title: "Americano",
      description:
        "Wanna mix it up and meet new peeps? Americano's your jam! This format's all about individual glory, even though you're playing in pairs. We randomly pair you up for each short match.",
    },
    {
      id: "mexicano",
      title: "Mexicano",
      description:
        "Level up your Americano experience with Mexicano! It's still about individual points and random pairings, but with a twist.",
    },
    {
      id: "mixicano",
      title: "Mixicano",
      description:
        "Alright, this one's for the co-ed kings and queens! Mixicano is basically Mexicano but specifically for mixed doubles. So, it's a guy and a girl on each team.",
    },
    {
      id: "round_robin",
      title: "Round Robin",
      description:
        "Ready for a marathon? Round Robin is where every pair (or team) in your group plays every other pair in that group at least once.",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <MatchFormatCardHover
        items={formats}
        value={selectedId}
        onSelect={onSelect}
        hasError={hasError}
      />
    </div>
  );
}
