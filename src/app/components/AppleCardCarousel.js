"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

const DummyContent = ({ match }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {match.description || "No description provided."}
        </span>{" "}
        📍 Location: {match.location} — 📞 Contact: {match.contact_info}
      </p>
      <div className="relative md:w-1/2 md:h-1/2 h-80 w-full mx-auto">
        <Image
          src="https://assets.aceternity.com/macbook.png"
          alt="Macbook"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
};

export default function MatchesCarousel() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  const cards = matches.map((match, index) => (
    <Card
      key={match.id}
      card={{
        category: match.format,
        title: match.name,
        src: "https://assets.aceternity.com/macbook.png", // static dummy image
        content: <DummyContent match={match} />,
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full">
      {cards.length > 0 && <Carousel items={cards} />}
    </div>
  );
}
