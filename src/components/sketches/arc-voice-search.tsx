"use client";

import wtaLogo from "@/assets/arc-voice-search-a1.png";
import wikipediaLogo from "@/assets/arc-voice-search-a2.png";
import igaBg from "@/assets/arc-voice-search-a3.webp";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";

export function ArcVoiceSearch() {
  const [searchMode, setSearchMode] = useState<"PROMPT" | "LOADING" | "RESULTS" | "OFF">("OFF");
  const [searchText, setSearchText] = useState("");
  const searchModeTimeoutRef = useRef<NodeJS.Timeout>();
  const propmptTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchMode("OFF");
        setSearchText("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mocking fetch of results
  useEffect(() => {
    if (propmptTimeoutRef.current) {
      clearTimeout(propmptTimeoutRef.current);
    }

    if (searchModeTimeoutRef.current) {
      clearTimeout(searchModeTimeoutRef.current);
    }

    if (searchMode === "PROMPT") {
      const timeout = setTimeout(() => setSearchMode("LOADING"), 3500);
      searchModeTimeoutRef.current = timeout;

      if (!searchText) {
        const timeout = setTimeout(() => setSearchText("Who is the top 1 WTA player in the world?"), 1000);
        propmptTimeoutRef.current = timeout;
      }
    }

    if (searchMode === "LOADING") {
      const timeout = setTimeout(() => setSearchMode("RESULTS"), 2000);
      searchModeTimeoutRef.current = timeout;
    }

    return () => {
      if (searchModeTimeoutRef.current) {
        clearTimeout(searchModeTimeoutRef.current);
      }

      if (propmptTimeoutRef.current) {
        clearTimeout(propmptTimeoutRef.current);
      }
    };
  }, [searchMode, searchText]);

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
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" className="z-10 h-14 w-14">
                <path d="M3 1V5" stroke="white" stroke-width="1.4" stroke-linecap="round" />
                <path d="M7 1V5" stroke="white" stroke-width="1.4" stroke-linecap="round" />
                <path d="M1 8C2.5 10 7.5 10 9 8" stroke="white" stroke-width="1.4" stroke-linecap="round" />
              </svg>

              <div className="z-10 mx-4 mt-8">
                {searchText ? (
                  <motion.div
                    layout
                    key={`arc-prompt-${searchText}`}
                    variants={promptVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap items-center justify-center rounded-2xl bg-black/20 px-2 py-2 text-sm text-white"
                  >
                    {searchText.split(" ").map((word, index) => (
                      <motion.span
                        key={`arc-prompt-word-${index}`}
                        variants={promptItemVariants}
                        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p className="py-1 text-xl text-white">Hi! How can I help?</motion.p>
                )}
              </div>
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
      case "RESULTS":
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
            className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-muted/40 dark:bg-muted/20"
          >
            <div>
              {searchMode === "LOADING" ? (
                <>
                  <p className="z-[3] mt-12 px-4 text-sm text-white drop-shadow-lg">Searching...</p>
                  <h2 className="mb-6 text-pretty px-4 text-xl font-semibold leading-5 tracking-tighter text-white drop-shadow-lg">
                    {searchText}
                  </h2>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative flex h-[134px] flex-col justify-end overflow-hidden bg-gradient-to-t from-black/50 via-transparent to-transparent"
                >
                  <Image src={igaBg} alt="" className="absolute inset-0 z-[-1] h-full w-full object-cover" />
                  <h2 className="text-pretty px-4 pb-4 text-xl font-semibold leading-5 tracking-tighter text-white drop-shadow-lg">
                    Top 1 WTA Player
                  </h2>
                  <div className="absolute bottom-[-10px] z-10 h-[24px] w-full bg-[url('/assets/wave-light.svg')] dark:bg-[url('/assets/wave-dark.svg')]"></div>
                </motion.div>
              )}
            </div>
            <div className="flex w-fit flex-row gap-3 px-4">
              <div
                aria-label="Search google"
                className="flex h-[72px] w-[100px] cursor-pointer flex-col overflow-hidden rounded-lg bg-muted/80"
              >
                <div className="flex w-full flex-1 items-center gap-2 whitespace-nowrap pl-2 text-xs">
                  <Icon.google className="h-auto min-w-fit" />
                  <p
                    aria-hidden="true"
                    className="rounded-xl border border-muted-foreground/40 bg-white px-2 py-1 dark:bg-muted dark:text-muted-foreground"
                  >
                    {searchText}
                  </p>
                </div>
                <div className="bg-muted px-2 py-2">
                  <p className="text-xs font-semibold">Search google</p>
                </div>
              </div>
              <AnimatePresence mode="popLayout">
                {searchMode === "LOADING" ? (
                  <motion.div
                    key="arc-loading-results-1-loading"
                    className="flex h-[72px] w-[100px] flex-col items-center justify-center gap-y-2 rounded-lg bg-muted px-2 py-4"
                    exit={{ opacity: 0, scale: 0.2, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  >
                    <div className="flex h-full w-full flex-col gap-y-1">
                      <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                      <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                      <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                    </div>
                    <div className="flex h-full w-full items-end">
                      <Skeleton className="h-[8px] w-[40%] bg-muted-foreground/50" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="arc-loading-results-1-result"
                    aria-label="WTA Tennis"
                    className="flex h-[72px] w-[100px] cursor-pointer flex-col rounded-lg bg-muted"
                    initial={{ opacity: 0, scale: 0.2, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  >
                    <div className="flex w-full flex-1 items-center gap-2 text-pretty px-2 text-[10px] font-bold">
                      Official Women&apos;s Tennis Rankings
                    </div>
                    <div className="inline-flex items-center gap-x-1 px-2 py-2">
                      <Image src={wtaLogo} className="h-4 w-4 dark:rounded-sm dark:bg-white" width={32} height={32} alt="" />
                      <p className="text-[10px] text-muted-foreground">wtatennis.com</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                {searchMode === "LOADING" ? (
                  <motion.div
                    key="arc-loading-results-2-loading"
                    className="flex h-[72px] w-[100px] flex-col items-center justify-center gap-y-2 rounded-lg bg-muted px-2 py-4"
                    exit={{ opacity: 0, scale: 0.2, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  >
                    <div className="flex h-full w-full flex-col gap-y-1">
                      <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                      <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                      <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                    </div>
                    <div className="flex h-full w-full items-end">
                      <Skeleton className="h-[8px] w-[40%] bg-muted-foreground/50" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="arc-loading-results-2-result"
                    aria-label="Wikipedia"
                    className="flex h-[72px] w-[100px] cursor-pointer flex-col rounded-lg bg-muted"
                    initial={{ opacity: 0, scale: 0.2, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  >
                    <div className="flex w-full flex-1 items-center gap-2 text-pretty px-2 text-[10px] font-bold">
                      List of WTA number 1 players
                    </div>
                    <div className="inline-flex items-center gap-x-1 px-2 py-2">
                      <Image src={wikipediaLogo} className="h-4 w-4 dark:rounded-sm dark:bg-white" width={32} height={32} alt="" />
                      <p className="text-[10px] text-muted-foreground">wikipedia.org</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-6 flex h-full w-full flex-col gap-2 px-4">
              {searchMode === "LOADING" ? (
                <>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div className="flex flex-row items-start gap-x-2" key={`arc-loading-results-${idx}`}>
                      <Skeleton className="h-[16px] w-[16px] bg-muted-foreground/50" />
                      <div className="flex w-full flex-col gap-y-1">
                        <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                        <Skeleton className="h-[8px] w-full bg-muted-foreground/50" />
                        <Skeleton className="h-[8px] w-[40%] bg-muted-foreground/50" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <motion.div
                  layout
                  variants={promptVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap items-start justify-start text-pretty pr-2 text-xs text-black dark:text-white"
                >
                  {`The current world No. 1 female tennis player in the WTA rankings is Iga Świątek. She is the first person from Poland to hold this ranking. The WTA rankings are determined based on a merit based system, considering the player who has garnered the most ranking points on the WTA Tour over the previous 52 weeks. Iga Świątek has been performing exceptionally well, and her achievements have secured her the top spot in women's singles tennis. 🎾`
                    .split(" ")
                    .map((word, index) => (
                      <motion.p
                        key={`arc-result-prompt-word-${index}`}
                        variants={promptItemVariants}
                        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                      >
                        {word}
                      </motion.p>
                    ))}
                </motion.div>
              )}
            </div>
            <AnimatePresence>
              {searchMode === "LOADING" && (
                <motion.div
                  className="absolute inset-0 -z-[1] h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0, delay: 0.6 }}
                  style={{
                    background: "linear-gradient(120deg, rgba(202,181,244,1) 0%, rgba(228,172,192,1) 56%, rgba(244,232,240,1) 100%)",
                    borderRadius: "12px",
                  }}
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      case "OFF":
        return null;
    }
  }, [searchMode, searchText]);

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
          onClick={() => {
            setSearchMode("OFF");
            setSearchText("");
          }}
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

const promptVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.3,
      type: "spring",
      bounce: 0,
    },
  },
};

const promptItemVariants: Variants = {
  hidden: { opacity: 0, marginRight: 0, width: 0 },
  visible: {
    width: "fit-content",
    height: "auto",
    opacity: 1,
    marginRight: "4px",
  },
};

const soundbarVariants: Variants = {
  visible: (index: number) => ({
    height: [`8px`, `24px`, `8px`],
    transition: {
      repeat: Infinity,
      duration: Math.random() * 1.5 + index / 10,
      ease: "easeOut",
      delay: 0.8,
    },
  }),
  hidden: { height: ["1px"] },
};

const initialContentVariants: Variants = {
  visible: { rotate: 0, zIndex: 1, height: "100%", width: "100%", scale: 1, y: 0, x: 0 },
  minimized: { rotate: 12, zIndex: 5, height: "45%", width: "80%", scale: 0.15, y: 355, x: -50, borderRadius: "32px" },
};
