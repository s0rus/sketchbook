"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function ClerkTracingBeam() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollAreaRef,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const updateContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  };

  useLayoutEffect(() => {
    updateContentHeight();
  }, [contentRef]);

  useEffect(() => {
    const handleResize = () => {
      updateContentHeight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.9], [0, contentHeight]), {
    stiffness: 500,
    damping: 90,
  }) as MotionValue<number>;

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, contentHeight]), {
    stiffness: 500,
    damping: 90,
  }) as MotionValue<number>;

  const date = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date());

  const activeColor = useTransform(scrollYProgress, [0, 0.001], ["#22c55e", "#909098"]);

  return (
    <motion.div
      ref={scrollAreaRef}
      className="h-full w-full overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted scrollbar-thumb-rounded-full"
    >
      <div className="mt-32 flex flex-row gap-8 ">
        <div className="relative">
          <motion.div style={{ color: activeColor }} className="mr-2 flex min-w-fit flex-row items-center gap-2">
            <time className="text-nowrap">{date}</time>
            <div className="z-10 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-muted">
              <motion.div style={{ backgroundColor: activeColor }} className="min-h-2 min-w-2 rounded-full"></motion.div>
            </div>
          </motion.div>
          <svg
            viewBox={`0 0 20 ${contentHeight}`}
            width="20"
            height={contentHeight}
            className="absolute -right-[19px] top-[4px] -z-10 mx-4 block"
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0V ${contentHeight * 0.2} l 18 24 V ${contentHeight * 0.8} l -18 24V ${contentHeight}`}
              fill="none"
              className="stroke-muted-foreground"
              strokeOpacity="0.16"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <motion.path
              d={`M 1 0V ${contentHeight * 0.2} l 18 24 V ${contentHeight * 0.8} l -18 24V ${contentHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <defs>
              <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
                <stop stopColor="#181616" stopOpacity="0"></stop>
                <stop stopColor="#181616"></stop>
                <stop offset="0.325" stopColor="#22c55e"></stop>
                <stop offset="1" stopColor="#22c55e" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
        <div ref={contentRef} className="prose prose-stone relative">
          <h2>Clerk Tracing Beam</h2>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, fugit voluptatibus praesentium consectetur aperiam magni
              omnis odio rem nemo nihil doloribus ducimus similique, repudiandae aliquid eos harum laboriosam at. Laborum?
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
