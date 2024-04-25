"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";

export function ClerkTracingBeam() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: scrollAreaRef,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });

  return (
    <motion.div
      ref={scrollAreaRef}
      className=" scrollbar-thumb-muted scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full h-full w-full overflow-y-scroll"
    >
      <div className="h-[1000px]">xD</div>
    </motion.div>
  );
}
