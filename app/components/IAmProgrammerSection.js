"use client";

import { useState, useRef, useEffect } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  "Javascript",
  "C++",
  "PHP",
  "Python",
  "Data 5",
  "Data 6",
  "Data 7",
  "Data 8",
  "Data 9",
  "Data 10",
];

export default function IAmProgrammerSection() {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef();
  const touchStart = useRef(0);

  const handleScrollNext = () => {
    setStartIndex((prev) => (prev + 1) % data.length);
  };

  const handleScrollPrev = () => {
    setStartIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Scroll event handling
  useEffect(() => {
    const handleWheel = (event) => {
      if (containerRef.current && containerRef.current.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();

        if (event.deltaY > 0) handleScrollNext();
        else handleScrollPrev();
      }
    };

    const handleTouchStart = (event) => {
      touchStart.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      const touchEnd = event.touches[0].clientY;
      if (touchStart.current - touchEnd > 30) handleScrollNext();
      else if (touchEnd - touchStart.current > 30) handleScrollPrev();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  // 3 data
  const visibleData = [
    data[startIndex],
    data[(startIndex + 1) % data.length],
    data[(startIndex + 2) % data.length],
  ];

  return (
    <div className="w-auto flex">
      Original
      <ScrollShadow
        hideScrollBar
        ref={containerRef}
        className="w-60 h-30 overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {visibleData.map((item, index) => (
            <motion.div
              key={`${startIndex}-${index}`}
              initial={{
                scale: index === 0 ? 1 : 0.8, // First item starts at normal scale, others smaller
                opacity: 1,
              }}
              animate={{
                scale: 1, // Scale up to full size
                opacity: 1,
              }}
              exit={
                index === 0
                  ? { scale: 0, opacity: 0 } // First item disappears
                  : { scale: 1, opacity: 1 } // Others stay normal
              }
              transition={{ duration: 0.5 }}
              className="bg-gray-700 p-2 w-full text-center rounded-lg"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollShadow>
    </div>
  );
}
