"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

const ISLAND_STATES = {
  IDLE: "IDLE",
  RING: "RING",
  TIMER: "TIMER",
  SONG: "SONG",
} as const;

type IslandState = keyof typeof ISLAND_STATES;

export function DynamicIsland() {
  const [islandState, setIslandState] = useState<IslandState>("IDLE");
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning) {
      if (time > 0) {
        timer = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        timer = setTimeout(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1500);
      }
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [isTimerRunning, time]);

  const content = useMemo(() => {
    switch (islandState) {
      case "IDLE":
        return (
          <motion.div
            key="IDLE"
            layoutId="island"
            className="h-[28px] min-w-[100px] bg-black"
            style={{ borderRadius: "9999px" }}
          ></motion.div>
        );
      case "RING":
        return (
          <motion.div
            key="RING"
            layoutId="island"
            className="flex w-[120px] items-center justify-between bg-black px-3 py-1"
            style={{ borderRadius: "9999px" }}
          >
            <motion.div
              initial={{
                x: 4,
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                x: 4,
                opacity: 0,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                duration: 0.4,
                bounce: 0,
              }}
            >
              <Icon.bell className="h-4 w-4" />
            </motion.div>
            <motion.p
              initial={{
                x: -4,
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                x: -4,
                opacity: 0,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                duration: 0.4,
                bounce: 0,
              }}
              className="text-sm font-bold"
            >
              Ring
            </motion.p>
          </motion.div>
        );
      case "TIMER":
        return (
          <motion.div
            key="TIMER"
            layoutId="island"
            className="flex items-center justify-between gap-6 bg-black px-4 py-3"
            style={{ borderRadius: "9999px" }}
          >
            <motion.div
              initial={{ filter: "blur(4px)", opacity: 0 }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                type: "spring",
                duration: 0.6,
                bounce: 0,
              }}
              className="flex flex-row items-center gap-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                <button
                  className="flex items-center justify-center rounded-full bg-primary/20 p-3 text-primary transition-colors hover:bg-primary/40"
                  onClick={() => setIsTimerRunning((prevRunning) => !prevRunning)}
                >
                  {isTimerRunning ? (
                    <motion.span key="pause" variants={variants} initial="hidden" animate="visible" exit="hidden">
                      <Icon.pause className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="play" variants={variants} initial="hidden" animate="visible" exit="hidden">
                      <Icon.play className="h-5 w-5" />
                    </motion.span>
                  )}
                </button>
              </AnimatePresence>
              <button
                className="flex items-center justify-center rounded-full bg-muted/80 p-3 text-muted-foreground transition-colors hover:bg-muted"
                onClick={() => {
                  setIsTimerRunning(true);
                  setTime(0);
                  setIslandState("IDLE");
                }}
              >
                <Icon.X className="h-5 w-5" />
              </button>
            </motion.div>
            <div className="mt-2 flex items-baseline gap-1 text-primary">
              <span className="text-sm font-bold">Timer</span>
              <span className="font-mono text-3xl">{`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`}</span>
            </div>
          </motion.div>
        );
      case "SONG":
        <div>xd</div>;
    }
  }, [islandState, isTimerRunning, time]);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="min-h-[150px]">
        <AnimatePresence mode="popLayout">{content}</AnimatePresence>
      </div>
      <div className="flex flex-row gap-x-2">
        {Object.values(ISLAND_STATES).map((state) => (
          <Button
            variant="outline"
            size="sm"
            key={`state-${state}`}
            onClick={() => {
              setIsTimerRunning(true);
              setTime(0);
              setIslandState(state);
            }}
          >
            {state}
          </Button>
        ))}
      </div>
    </div>
  );
}

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};
