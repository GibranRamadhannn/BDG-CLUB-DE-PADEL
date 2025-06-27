"use client";

import { useEffect, useRef, useState } from "react";
import {
  SquareTerminal,
  TabletSmartphone,
  MonitorCog,
  FlaskConical,
  Paintbrush,
  BrainCircuit,
} from "lucide-react";
import CardItem from "../CardItems";
import SkeletonCard from "../skeletons/SkeletonCardGallery";

const cardData = [
  { icon: SquareTerminal, title: "Website & Web App development" },
  { icon: TabletSmartphone, title: "Mobile development" },
  { icon: MonitorCog, title: "Interfacing system" },
  { icon: Paintbrush, title: "UI/UX" },
  { icon: FlaskConical, title: "Laboratorium Information system" },
  { icon: BrainCircuit, title: "AI Integrated system" },
];

export default function CardsGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const target = galleryRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div
      className="dark:invert flex items-center justify-center"
      ref={galleryRef}
    >
      <div className="flex justify-center items-center w-full mx-5 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full md:w-[70rem] md:h-[45rem] gap-4">
          {isVisible
            ? cardData.map((item, index) => (
                <CardItem key={index} icon={item.icon} title={item.title} />
              ))
            : Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );
}
