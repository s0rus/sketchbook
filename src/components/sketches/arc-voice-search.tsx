"use client";

import { useEffect, useState } from "react";
import { Icon } from "../ui/icon";

import { AnimatePresence, motion, type Variants } from "framer-motion";

export function ArcVoiceSearch() {
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-[500px] w-[300px] overflow-hidden rounded-xl border-2 border-muted">
      <div className="relative flex h-full w-full flex-col items-center justify-end">
        <div className="absolute bottom-0 flex h-[60px] w-full items-center justify-center bg-muted/80 dark:bg-muted/20">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsSearchMode(true)}
            className="rounded-full bg-muted-foreground/40 px-4 py-1 text-foreground shadow-inner shadow-black/40 transition-colors hover:bg-muted-foreground/60 dark:bg-muted-foreground/40 dark:text-background dark:shadow-black dark:hover:bg-muted-foreground/60"
          >
            <Icon.plus />
          </button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {isSearchMode ? (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
                y: 200,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                y: 200,
              }}
              transition={{
                type: "spring",
                duration: 0.3,
                bounce: 0,
              }}
              className="z-0 flex h-full w-full flex-col items-center justify-end"
            >
              <div className="arc-search-blob absolute left-0 top-[55%] h-full w-full rounded-full"></div>
              <p className="z-10 text-xl text-white">Hi! How can I help?</p>
              <div className="mb-4 flex h-[60px] flex-row items-center gap-x-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <motion.div
                    key={`soundbar-${index}`}
                    animate={"visible"}
                    variants={soundbarVariants}
                    custom={index + 1}
                    className="z-10 w-1 rounded-full bg-white"
                  ></motion.div>
                ))}
              </div>
              <motion.div className="arc-search-initial-bg absolute left-0 top-[55%] h-full w-full rounded-full"></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  duration: 2,
                  bounce: 0,
                  delay: 0.5,
                }}
                className="arc-search-target-bg absolute left-0 top-[90%] h-full w-full scale-110 rounded-full"
              ></motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

const soundbarVariants: Variants = {
  visible: (index: number) => ({
    height: [`8px`, `24px`, `8px`],
    transition: {
      repeat: Infinity,
      duration: Math.random() * 1.5 + index / 10,
      ease: "easeOut",
      delay: 0.5,
    },
  }),
  hidden: { height: ["1px"] },
};
