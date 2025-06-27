"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "./match-cards-carousel";

const LoadingPlaceholder = () => {
  return (
    <div className="w-full h-full flex gap-4 overflow-x-auto py-10 px-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-80 w-56 md:w-96 rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default function MatchCarousel({ onTotalChange }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
        if (onTotalChange) onTotalChange(data.length);
      })
      .catch(() => {
        setMatches([]);
        setLoading(false);
        if (onTotalChange) onTotalChange(0);
      });
  }, [onTotalChange]);

  if (loading) return <LoadingPlaceholder />;

  if (matches.length === 0) {
    return (
      <div className="overflow-hidden whitespace-nowrap py-10">
        <div className="animate-marquee text-xl text-stoplight font-bold">
          No smashes yet, but we&apos;re just getting warmed up.
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const cards = matches.map((match, index) => {
    const isToday =
      new Date(match.created_at).toISOString().split("T")[0] === today;

    return (
      <Card
        key={match.id}
        card={{
          id: match.id,
          category: match.format,
          title: match.name,
          src: "",
          gradient: "",
          newBadge: isToday,
          description: match.description || "No description provided.",
          cp_phone_number: match.cp_phone_number || "-",
          field: match.field || "-",
        }}
        index={index}
      />
    );
  });

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}
