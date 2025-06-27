import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { MarsIcon, VenusIcon, ShuffleIcon } from "lucide-react";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("flex items-start gap-3 w-full", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
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
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-mercury border border-silver-medal relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h4
        className={cn(
          "text-foreground font-bold tracking-wide mb-2 text-lg",
          className
        )}
      >
        {children}
      </h4>
      <div className="flex justify-center items-center gap-2">
        <MarsIcon size={20} className="text-berlin-blue" />
        <VenusIcon size={20} className="text-berlin-blue" />
        <ShuffleIcon size={20} className="text-stoplight" />
      </div>
    </div>
  );
};
export const CardDescription = ({ className, children }) => {
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
