"use client";
import { IconLocationPin } from "@tabler/icons-react";
import {
  CircleArrowLeftIcon,
  CirclePlayIcon,
  DotIcon,
  MapPin,
  MarsIcon,
  PhoneCallIcon,
  VenusIcon,
} from "lucide-react";
import Link from "next/link";
import CountUp from "react-countup";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import SkeletonDetailMatch from "@/app/components/match/SkeletonDetailMatch";

export default function DetailMatchPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [matchData, setMatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.warn("No match ID found in URL params. Redirecting...");
      router.replace("/match");
      return;
    }

    const fetchMatchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/matches/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch match details."
          );
        }
        const data = await response.json();
        setMatchData(data);
      } catch (err) {
        console.error("Error fetching match details:", err);
        router.replace("/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id, router]);

  if (isLoading) {
    return <SkeletonDetailMatch />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)] bg-mercury">
      {/* Back to match page */}
      <div className="pt-32 mb-8 mx-6 font-[family-name:var(--font-geist-mono)]">
        <Link
          href="/match"
          className="text-foreground text-md font-semibold hover:text-stoplight flex items-center gap-3 transition-colors duration-200 ease-in-out"
        >
          <CircleArrowLeftIcon size={16} /> Back to match page
        </Link>
      </div>

      {/* Big Info */}
      <div className="w-full flex justify-between items-center py-1 px-4">
        <div className="flex justify-center items-center gap-3">
          {/* Title Match */}
          <h1 className="md:text-4xl text-3xl text-black font-bold font-[family-name:var(--font-roboto)]">
            {matchData.name || "Match Name Not Available"}
          </h1>
          {/* Category Match */}
          <span className="rounded-full bg-white capitalize px-3 py-1 text-sm font-semibold text-stoplight shadow">
            {matchData.format || "Match Format Not Available"}
          </span>
        </div>

        {/* Start Match Btn */}
        <button className="bg-moderate-green font-medium text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2">
          <CirclePlayIcon size={18} /> Start Match
        </button>
      </div>

      {/* Small Info */}
      <div className="mb-7 w-full flex justify-start gap-2 items-center py-1 px-4">
        {/* Created Time */}
        <p className="text-sm text-black font-medium font-[family-name:var(--font-roboto)]">
          Created At {formatDate(matchData.created_at)}
        </p>

        <DotIcon size={18} />

        {/* Created By */}
        <p className="text-sm text-black font-medium font-[family-name:var(--font-roboto)]">
          Created By {matchData.creator?.profile?.full_name || "Unknown"}
        </p>
      </div>

      {/* Details */}
      <div className="flex justify-between items-stretch w-full h-full gap-3 py-1 px-4">
        {/* Players */}
        <div className="p-5 w-full h-full max-w-3/5 rounded-xl bg-white flex flex-col">
          {/* Title & Total Players */}
          <div className="flex w-full justify-between items-start">
            <div className="flex justify-start gap-3 items-center mb-8">
              {/* Players Title */}
              <h1 className="text-2xl text-black font-bold font-[family-name:var(--font-roboto)]">
                PLAYERS
              </h1>
              {/* Players Total */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground">
                <p className="text-md font-semibold text-white">
                  <CountUp end={20} duration={2} />
                </p>
              </div>
            </div>

            {/* Start Match Btn */}
            <button className="bg-moderate-green font-medium text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2">
              <CirclePlayIcon size={18} /> Start Match
            </button>
          </div>

          {/* Player Cards */}
          <div className="grid grid-cols-3 gap-3 flex-grow">
            {/* Ulangi satu komponen PlayerCard dengan map nanti */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-start gap-3 items-center">
                <div className="bg-foreground rounded-lg px-3 py-6 text-white">
                  <VenusIcon size={30} />
                </div>
                <div className="flex flex-col justify-between items-start gap-1">
                  <p className="text-md font-semibold text-foreground">
                    Player girl 1
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    Address pg1
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    @username.ig
                  </p>
                </div>
              </div>
            ))}

            {[...Array(3)].map((_, i) => (
              <div
                key={`b${i}`}
                className="flex justify-start gap-3 items-center"
              >
                <div className="bg-foreground rounded-lg px-3 py-6 text-white">
                  <MarsIcon size={30} />
                </div>
                <div className="flex flex-col justify-between items-start gap-1">
                  <p className="text-md font-semibold text-foreground">
                    Player boy 1
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    Address pb1
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    @username.ig
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match Detail info */}
        <div className="p-5 w-full h-full max-w-2/5 rounded-xl bg-white flex flex-col">
          {/* CP Title */}
          <h1 className="text-2xl mb-8 text-black font-bold font-[family-name:var(--font-roboto)]">
            CONTACT PERSON
          </h1>

          {/* CP & Button CP */}
          <div className="flex justify-between items-center w-full pb-8 mb-8 border-b border-mercury">
            {/* CP */}
            <div className="flex justify-center items-center gap-3">
              <div className="bg-foreground rounded-lg p-4 text-white">
                <MarsIcon size={30} />
              </div>
              <div className="flex flex-col justify-between items-start gap-1">
                <p className="text-lg font-semibold text-foreground capitalize">
                  {matchData.cp_name || "Contact Person Name Not Available"}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {matchData.cp_instagram || "Contact Person IG Not Available"}
                </p>
              </div>
            </div>

            {/* Contact Button */}
            <button className="bg-background border border-foreground rounded-xl p-4 text-foreground cursor-pointer">
              <PhoneCallIcon size={25} />
            </button>
          </div>

          {/* Match Address Title */}
          <h1 className="text-2xl mb-8 text-black font-bold font-[family-name:var(--font-roboto)]">
            MATCH ADDRESS
          </h1>

          {/* Address & GMAPS */}
          <div className="flex justify-between items-center w-full mb-3">
            {/* Address */}
            <div className="flex justify-center items-center gap-3">
              <div className="bg-foreground rounded-lg p-4 text-white">
                <MapPin size={30} />
              </div>
              <div className="flex flex-col justify-between items-start gap-1">
                <p className="text-lg font-semibold text-foreground">
                  {matchData.field || "Field Name Not Available"}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {matchData.field_address || "Field Address Not Available"}
                </p>
              </div>
            </div>

            {/* See on GMAPS */}
            <div className="flex justify-center items-center gap-3">
              <Link href="#" className="text-md text-foreground font-medium">
                See on google maps
              </Link>
              <IconLocationPin size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-4 mt-4">
        <div className="p-5 w-full h-full rounded-xl bg-white flex flex-col">
          {/* Title */}
          <h1 className="text-2xl text-black font-bold font-[family-name:var(--font-roboto)]">
            LEADERBOARD
          </h1>
        </div>
      </div>
    </div>
  );
}
