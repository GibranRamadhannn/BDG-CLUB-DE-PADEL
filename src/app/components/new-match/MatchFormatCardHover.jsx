"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const MatchFormatCardHover = ({
  items,
  className,
  value,
  onSelect,
  hasError,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("flex items-start gap-3 w-full", className)}>
      {items.map((item, idx) => {
        const isSelected = value === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "relative group block p-2 h-full w-full cursor-pointer",
              isSelected && "bg-stoplight block rounded-3xl"
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelect?.(item.id)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-stoplight/70 block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card isSelected={isSelected} hasError={hasError && !value}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

const Card = ({ className, children, isSelected, hasError }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-[300px] w-full p-4 overflow-hidden bg-mercury border border-silver-medal relative z-20 transition-all",
        isSelected && "bg-white shadow-lg",
        hasError && "border-stoplight",
        className
      )}
    >
      <div className="relative z-50 h-full">
        <div className="p-1 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-foreground font-bold tracking-wide mb-2 text-lg",
        className
      )}
    >
      {children}
    </h4>
  );
};

const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-foreground/70 tracking-wide leading-relaxed text-md",
        className
      )}
    >
      {children}
    </p>
  );
};
