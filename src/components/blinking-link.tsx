"use client";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const pulseVariants: Variants = {
  initial: {
    scaleX: [1, 0.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
  animate: {
    scaleX: 1,
  },
};

export function BlinkingLink() {
  return (
    <Link href="https://devsor.us/" target="_blank" className="group relative">
      <motion.div className="inline" whileHover="animate" animate="initial">
        devsor.us
        <motion.span
          className="absolute bottom-0 block h-[1px] w-full bg-muted transition-colors group-hover:bg-primary"
          variants={pulseVariants}
        ></motion.span>{" "}
      </motion.div>
    </Link>
  );
}
