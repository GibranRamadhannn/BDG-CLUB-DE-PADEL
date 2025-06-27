"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {
  PhoneIcon,
  MapPinIcon,
  StickyNoteIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-6"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />
          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") handleClose();
    }
    document.body.style.overflow = open ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const router = useRouter();

  const handleClick = () => {
    router.push(`/match/detail-match/${card.id}`);
    handleClose();
  };

  return (
    <>
      {/* Card Open */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl p-4 md:p-10 bg-white"
            >
              <div className="flex justify-between items-center w-full">
                {/* Badge kategori */}
                <span className="z-50 capitalize text-xl font-semibold text-stoplight">
                  {card.category}
                </span>
                {/* Close button */}
                <button
                  className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-foreground cursor-pointer"
                  onClick={handleClose}
                >
                  <IconX className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="w-full flex justify-start items-center gap-2 mt-4">
                {/* Title */}
                <motion.p className="text-4xl font-semibold text-foreground text-start">
                  {card.title}
                </motion.p>
                {/* Badge new */}
                {card.newBadge && (
                  <span className="z-50 rounded-full bg-bright-blue capitalize px-2 py-1 text-sm font-semibold text-white">
                    NEW
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center items-start space-y-2 w-full my-8">
                <motion.p className="text-md font-medium text-foreground flex justify-center items-center gap-3">
                  <PhoneIcon size={17} /> {card.cp_phone_number}
                </motion.p>
                <motion.p className="text-md font-medium text-foreground flex justify-center items-center gap-3">
                  <MapPinIcon size={17} /> {card.field}
                </motion.p>
                <motion.p className="text-md font-medium text-foreground flex justify-center items-center text-start gap-3">
                  <StickyNoteIcon size={17} /> {card.description}
                </motion.p>
              </div>

              {/* See detail match */}
              <div className="flex justify-end items-center w-full">
                <button
                  onClick={handleClick}
                  className="bg-stoplight text-white px-6 py-2 mt-6 rounded-xl hover:opacity-90 flex justify-center items-center gap-2 cursor-pointer"
                >
                  <ArrowRightIcon size={17} /> See detail match
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Button Card Carousel */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className={cn(
          "relative z-10 flex h-80 w-56 md:w-96 flex-col items-start justify-start overflow-hidden rounded-3xl transition-transform duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-stoplight p-4 cursor-pointer",
          card.gradient ? `bg-gradient-to-br ${card.gradient}` : "bg-foreground"
        )}
      >
        <div className="flex justify-between items-center w-full">
          {/* Badge kategori */}
          <span className="z-50 rounded-full bg-white capitalize px-3 py-1 text-sm font-semibold text-stoplight shadow">
            {card.category}
          </span>
          {/* Badge new */}
          {card.newBadge && (
            <span className="z-50 rounded-full bg-bright-blue capitalize px-2 py-1 text-xs font-semibold text-white">
              NEW MATCH
            </span>
          )}
        </div>

        <div className="p-4 w-full h-full flex flex-col justify-between items-start">
          <motion.p className="text-3xl font-semibold text-white text-start">
            {card.title}
          </motion.p>
          <div className="flex flex-col justify-center items-start space-y-2">
            <motion.p className="text-sm font-medium text-white flex justify-center items-center gap-3">
              <PhoneIcon size={17} /> {card.cp_phone_number}
            </motion.p>
            <motion.p className="text-sm font-medium text-white flex justify-center items-center gap-3">
              <MapPinIcon size={17} /> {card.field}
            </motion.p>
            <motion.p className="text-sm font-medium text-white flex justify-center items-start text-start gap-3">
              <StickyNoteIcon size={17} /> {card.description}
            </motion.p>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }) => {
  return (
    <img
      className={cn(
        "h-full w-full object-cover transition duration-300",
        className
      )}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt || "Image"}
      {...rest}
    />
  );
};
