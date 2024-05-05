"use client";

import songAsset from "@/assets/dynamic-island-a1.jpg";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import Image from "next/image";
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
  const [isSilentMode, setIsSilentMode] = useState(false);

  const progressBarX = 100 - (time / 222) * 100;
  const timer = useMemo(() => formatTimer(time), [time]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning) {
      if (islandState === "SONG" && time > 222) {
        setTime(0);
      }

      if (islandState === "RING" && time % 2 === 0 && time > 0) {
        setIsSilentMode((prevSilent) => !prevSilent);
      }

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
  }, [isTimerRunning, time, islandState]);

  const content = useMemo(() => {
    switch (islandState) {
      case "IDLE":
        return (
          <motion.div
            key="IDLE"
            layoutId="island"
            className="h-[28px] min-w-[100px] bg-black"
            style={{ borderRadius: "32px" }}
          ></motion.div>
        );
      case "RING":
        return (
          <motion.div
            key="RING"
            layoutId="island"
            className="flex items-center justify-between gap-16 bg-black px-2 py-1 text-white"
            style={{ borderRadius: "32px" }}
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
              key={`ring-icon-${isSilentMode}`}
            >
              {isSilentMode ? (
                <motion.span layoutId="ring-icon" className="block w-full rounded-full bg-red-500 px-3 py-0.5 text-white">
                  <Icon.bellOff className="h-[14px] w-[14px]" />
                </motion.span>
              ) : (
                <motion.span layoutId="ring-icon">
                  <Icon.bell className="h-[14px] w-[14px]" />
                </motion.span>
              )}
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
              key={`ring-text-${isSilentMode}`}
            >
              {isSilentMode ? (
                <motion.span className="text-red-500" layoutId="ring-text">
                  Silent
                </motion.span>
              ) : (
                <motion.span layoutId="ring-text">Ring</motion.span>
              )}
            </motion.p>
          </motion.div>
        );
      case "TIMER":
        return (
          <motion.div
            key="TIMER"
            layoutId="island"
            className="flex items-center justify-between gap-6 bg-black px-4 py-3"
            style={{ borderRadius: "32px" }}
            initial={{ filter: "blur(8px)", opacity: 0 }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }}
          >
            <div className="flex flex-row items-center gap-1">
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
            </div>
            <div className="mt-2 flex items-baseline gap-1 text-primary">
              <span className="text-sm font-bold">Timer</span>
              <p>
                <MotionConfig
                  transition={{
                    type: "spring",
                    duration: 0.6,
                    bounce: 0,
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      className="font-mono text-3xl"
                      key={`timerMinutesFirstDigit-${timer.minutesFirstDigit}`}
                      variants={timerVariants}
                      initial="initial"
                      animate="visible"
                      exit="hidden"
                    >
                      {timer.minutesFirstDigit}
                    </motion.span>
                    <motion.span
                      className="font-mono text-3xl"
                      key={`timerMinutesSecondDigit-${timer.minutesFirstDigit}`}
                      variants={timerVariants}
                      initial="initial"
                      animate="visible"
                      exit="hidden"
                    >
                      {timer.minutesSecondDigit}
                    </motion.span>
                    <span className="font-mono text-3xl">:</span>
                    <motion.span
                      className="font-mono text-3xl"
                      key={`timerSecondsSecondDigit-${timer.secondsFirstDigit}`}
                      variants={timerVariants}
                      initial="initial"
                      animate="visible"
                      exit="hidden"
                    >
                      {timer.secondsFirstDigit}
                    </motion.span>
                    <motion.span
                      className="font-mono text-3xl"
                      key={`timerSecondsDigit-${timer.secondsSecondDigit}`}
                      variants={timerVariants}
                      initial="initial"
                      animate="visible"
                      exit="hidden"
                    >
                      {timer.secondsSecondDigit}
                    </motion.span>
                  </AnimatePresence>
                </MotionConfig>
              </p>
            </div>
          </motion.div>
        );
      case "SONG":
        return (
          <motion.div
            key="SONG"
            layoutId="island"
            className="flex items-center justify-between gap-6 bg-black px-8 py-6"
            style={{ borderRadius: "32px" }}
            initial={{ filter: "blur(8px)", opacity: 0 }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between gap-12">
                <div className="flex flex-row items-center gap-2">
                  <Image src={songAsset} alt="song" width={48} height={48} className="aspect-square h-[48px] w-[48px] rounded-md" />
                  <div>
                    <p className="text-sm font-bold text-white">imgonnagetyouback</p>
                    <p className="text-sm leading-3 text-white/60">Taylor Swift</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-0.5">
                  <AnimatePresence mode="popLayout">
                    {Array.from({ length: 10 }).map((_, index) =>
                      isTimerRunning ? (
                        <motion.div
                          key={`soundbar-${index}`}
                          animate={"visible"}
                          variants={songVariants}
                          custom={index + 1}
                          className="w-0.5 bg-primary"
                        ></motion.div>
                      ) : (
                        <motion.div key={`soundbar-${index}`} animate={{ height: "1px" }} className="w-0.5 bg-primary"></motion.div>
                      ),
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="w-[36px] text-left text-sm text-white/60">{`${formatTime(time)}`}</span>
                <div className="relative h-0.5 flex-1 overflow-hidden rounded-sm bg-white/20">
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    animate={{ x: `-${progressBarX}%` }}
                    transition={{
                      type: "spring",
                      duration: 0.1,
                      bounce: 0,
                    }}
                  ></motion.div>
                </div>
                <span className="min-w-[36px] text-right text-sm text-white/60">3:42</span>
              </div>
              <div className="mt-1 flex flex-row items-center justify-center gap-4 pb-1 text-white">
                <Icon.skipBack className="h-5 w-5" />
                <AnimatePresence mode="wait" initial={false}>
                  <button className="flex items-center justify-center" onClick={() => setIsTimerRunning((prevRunning) => !prevRunning)}>
                    {isTimerRunning ? (
                      <motion.span key="pause" variants={variants} initial="hidden" animate="visible" exit="hidden">
                        <Icon.pause className="h-6 w-6" />
                      </motion.span>
                    ) : (
                      <motion.span key="play" variants={variants} initial="hidden" animate="visible" exit="hidden">
                        <Icon.play className="h-6 w-6" />
                      </motion.span>
                    )}
                  </button>
                </AnimatePresence>
                <Icon.skipForward className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        );
    }
  }, [islandState, isTimerRunning, time, progressBarX, timer, isSilentMode]);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="min-h-[200px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {content}
        </AnimatePresence>
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
              setIsSilentMode(false);
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

const timerVariants: Variants = {
  initial: {
    y: 24,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: -12,
    opacity: 0,
  },
};

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const songVariants: Variants = {
  visible: (index: number) => ({
    height: [`4px`, `${4 + 24 * (index / 10)}px`, `4px`],
    transition: {
      repeat: Infinity,
      duration: Math.random() + index / 10,
      ease: "easeOut",
    },
  }),
  hidden: { height: ["1px"] },
};

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(1, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatTimer(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return {
    minutesFirstDigit: Math.floor(minutes / 10),
    minutesSecondDigit: minutes % 10,
    secondsFirstDigit: Math.floor(seconds / 10),
    secondsSecondDigit: seconds % 10,
  };
}
