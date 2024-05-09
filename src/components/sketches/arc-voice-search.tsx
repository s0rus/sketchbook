"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Icon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";

export function ArcVoiceSearch() {
  const [searchMode, setSearchMode] = useState<"PROMPT" | "LOADING" | "RESULTS" | "OFF">("LOADING");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchMode("OFF");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchMode === "PROMPT") {
      setTimeout(() => setSearchMode("LOADING"), 3000);
    }
  }, [searchMode]);

  const content = useMemo(() => {
    switch (searchMode) {
      case "PROMPT":
        return (
          <Fragment key="arc-prompt">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="absolute inset-0 z-[9] bg-black/20 dark:bg-muted/40"
            ></motion.div>
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
              className="z-10 flex h-full w-full flex-col items-center justify-end"
            >
              <div className="arc-search-blob absolute left-0 top-[55%] h-full w-full rounded-full"></div>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                className="z-10 mb-8 h-14 w-14"
                animate={{
                  y: [0, 12, -4],
                }}
                transition={{
                  ease: "easeInOut",
                  delay: 0.5,
                  duration: 0.3,
                }}
              >
                <motion.path
                  animate={{ scaleY: [1, 0.2, 1], rotate: [0, 6], originY: "center" }}
                  transition={{
                    ease: "easeOut",
                    delay: 0.5,
                    duration: 0.3,
                  }}
                  d="M3 1V5"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <motion.path
                  animate={{ scaleY: [1, 0.2, 1], rotate: [0, 6], originY: "center" }}
                  transition={{
                    ease: "easeOut",
                    delay: 0.5,
                    duration: 0.3,
                  }}
                  d="M7 1V5"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <motion.path
                  animate={{ scaleY: [1, 0.8, 1], scaleX: [1, 1.2, 1], y: [0, 0.6, 0.6], rotate: [0, 6, 6], originY: "center" }}
                  transition={{ ease: "easeOut", delay: 0.5, duration: 0.3 }}
                  d="M1 8C2.5 10 7.5 10 9 8"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </motion.svg>
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
          </Fragment>
        );
      case "LOADING":
        return (
          <motion.div
            key="arc-loading"
            initial={{
              opacity: 1,
              scale: 0.2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-muted/40 px-4 py-6 dark:bg-muted/20"
          >
            <p className="z-[3] text-sm text-white drop-shadow-lg">Searching...</p>
            <h2 className="text-pretty text-xl font-semibold leading-5 tracking-tighter text-white drop-shadow-lg">
              Who is the top 1 WTA player in the world?
            </h2>
            <div className="mt-6 flex w-fit flex-row gap-3">
              <div className="flex h-[72px] w-[100px] flex-col overflow-hidden rounded-lg bg-muted/80">
                <div className="flex w-full flex-1 items-center gap-2 whitespace-nowrap pl-2 text-xs">
                  <Icon.google className="h-auto min-w-fit" />
                  <p aria-hidden="true" className="rounded-xl bg-white px-2 py-1 dark:bg-muted-foreground/40 dark:text-muted-foreground">
                    Who is the top 1 WTA player in the world?
                  </p>
                </div>
                <div className="bg-muted px-2 py-2">
                  <p className="text-xs font-semibold">Search google</p>
                </div>
              </div>
              <div className="flex h-[72px] w-[100px] flex-col items-center justify-center gap-y-2 rounded-lg bg-muted px-2 py-4">
                <div className="flex h-full w-full flex-col gap-y-1">
                  <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                  <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                  <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                </div>
                <div className="flex h-full w-full items-end">
                  <Skeleton className="h-[8px] w-[40%] bg-muted-foreground/50" />
                </div>
              </div>
              <div className="flex h-[72px] w-[100px] flex-col items-center justify-center gap-y-2 rounded-lg bg-muted px-2 py-4">
                <div className="flex h-full w-full flex-col gap-y-1">
                  <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                  <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                  <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                </div>
                <div className="flex h-full w-full items-end">
                  <Skeleton className="h-[8px] w-[40%] bg-muted-foreground/50" />
                </div>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 -z-[1] h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0, delay: 0.6 }}
              style={{
                background: "linear-gradient(120deg, rgba(202,181,244,1) 0%, rgba(228,172,192,1) 56%, rgba(244,232,240,1) 100%)",
                borderRadius: "12px",
              }}
            ></motion.div>
          </motion.div>
        );
      case "RESULTS":
        return <div>xd</div>;
      case "OFF":
        return null;
    }
  }, [searchMode]);

  return (
    <div className="relative h-[500px] w-[280px] overflow-hidden rounded-xl border-2 border-muted shadow-lg">
      <div className="relative flex h-full w-full flex-col items-center justify-end">
        <div className="absolute bottom-0 z-[5] flex h-[60px] w-full items-center justify-center bg-muted/80 dark:bg-muted">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchMode("PROMPT")}
            className="rounded-full bg-muted-foreground/40 px-4 py-1 text-foreground shadow-inner shadow-black/40 transition-colors hover:bg-muted-foreground/60 dark:bg-muted-foreground/40 dark:text-background dark:shadow-black dark:hover:bg-muted-foreground/60"
          >
            <Icon.plus />
          </button>
        </div>
        <motion.div
          aria-label="Mutua Madrid 2024 News"
          onClick={() => setSearchMode("OFF")}
          variants={initialContentVariants}
          animate={searchMode === "PROMPT" || searchMode === "OFF" ? "visible" : "minimized"}
          className={cn("absolute inset-0 overflow-hidden", searchMode !== "PROMPT" && searchMode !== "OFF" && "cursor-pointer")}
          style={{ borderRadius: "12px" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          <div className="h-full w-full bg-white px-6 py-4 dark:bg-black">
            <Image
              src="/assets/placeholder.svg"
              alt="Tennis"
              width={300}
              height={150}
              className="h-[100px] w-full rounded-sm object-cover dark:brightness-[0.2]"
            />
            <p className="mt-8 text-xs tracking-wide">TENNIS</p>
            <h3 className="mt-1 font-bold tracking-tighter">Mutua Madrid 2024</h3>
            <p className="mt-4 text-pretty text-sm">
              Iga Świątek has won the 2024 Mutua Madrid Open beating Aryna Sabalenka in thrilling 3-set final.
            </p>
            <p className="mt-2 text-pretty text-sm">She has now 20 WTA Tour titles, leading the WTA rankings for 102 weeks and counting.</p>
            <p className="mt-2 text-pretty text-sm">Świątek is looking strong ahead of another big clay tournament in Rome.</p>
          </div>
        </motion.div>
        <AnimatePresence mode="wait">{content}</AnimatePresence>
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

const initialContentVariants: Variants = {
  visible: { rotate: 0, zIndex: 1, height: "100%", width: "100%", scale: 1, y: 0, x: 0 },
  minimized: { rotate: 12, zIndex: 5, height: "45%", width: "80%", scale: 0.15, y: 355, x: -50, borderRadius: "32px" },
};
