"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function MultiStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="text-sm font-bold">This is step one</h2>
            <p className="mt-2 text-sm">
              Usually in this step we would explain why this thing exists and what it does. Also, we would show a button to go to the next
              step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Skeleton className="h-4 w-[256px] rounded-lg" />
              <Skeleton className="h-4 w-[192px] rounded-lg" />
              <Skeleton className="h-4 w-[96px] rounded-lg" />
              <Skeleton className="h-4 w-[384px] rounded-lg" />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="text-sm font-bold">This is step two</h2>
            <p className="mt-2 text-sm">
              Usually in this step we would explain why this thing exists and what it does. Also, we would show a button to go to the next
              step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Skeleton className="h-4 w-[256px] rounded-lg" />
              <Skeleton className="h-4 w-[192px] rounded-lg" />
              <Skeleton className="h-4 w-[384px] rounded-lg" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-sm font-bold">This is step three</h2>
            <p className="mt-2 text-sm">
              Usually in this step we would explain why this thing exists and what it does. Also, we would show a button to go to the next
              step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Skeleton className="h-4 w-[256px] rounded-lg" />
              <Skeleton className="h-4 w-[192px] rounded-lg" />
              <Skeleton className="h-4 w-[128px] rounded-lg" />
              <Skeleton className="h-4 w-[224px] rounded-lg" />
              <Skeleton className="h-4 w-[384px] rounded-lg" />
            </div>
          </>
        );
    }
  }, [currentStep]);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        duration: 0.5,
        bounce: 0,
      }}
    >
      <motion.div
        animate={{
          height: bounds.height,
        }}
        className="relative w-[550px] overflow-hidden rounded-[12px] bg-border shadow-sm dark:bg-card"
      >
        <div ref={ref} className="p-6">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div ref={ref} key={currentStep} variants={variants} custom={dir} initial="initial" animate="animate" exit="exit">
              {content}
            </motion.div>
          </AnimatePresence>
          <motion.div layout className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === 0) {
                  return;
                }
                setDir(-1);
                setCurrentStep((prevStep) => prevStep - 1);
              }}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (currentStep === 2) {
                  return;
                }
                setDir(1);
                setCurrentStep((prevStep) => prevStep + 1);
              }}
              disabled={currentStep === 2}
            >
              Continue
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

const variants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: `${110 * dir}%`,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: `${-110 * dir}%`,
  }),
};
