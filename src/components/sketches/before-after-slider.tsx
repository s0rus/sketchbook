"use client";

import { motion, useDragControls, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [limiterPosition, setLimiterPosition] = useState(0.5);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (containerRef.current) {
      const newContainerWidth = containerRef.current.offsetWidth;
      const newPosition = (info.point.x - containerRef.current.getBoundingClientRect().left) / newContainerWidth;
      setLimiterPosition(newPosition);
    }
  };

  return (
    <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden rounded-lg bg-muted/20">
      <div className="absolute inset-0 z-[2]">
        <motion.div
          className="h-full w-full"
          style={{
            clipPath: `polygon(0 0, ${limiterPosition * 100}% 0, ${limiterPosition * 100}% 100%, 0% 100%)`,
          }}
        >
          <Image
            src="/assets/placeholder.svg"
            alt="placeholder"
            className="pointer-events-none h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            fill
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 z-[1]">
        <motion.div
          className="h-full w-full"
          style={{
            clipPath: `polygon(${limiterPosition * 100}% 0, 100% 0, 100% 100%, ${limiterPosition * 100}% 100%)`,
          }}
        >
          <Image
            src="/assets/placeholder.svg"
            alt="placeholder"
            className="pointer-events-none h-full w-full object-cover dark:brightness-[0.4] dark:grayscale"
            fill
          />
        </motion.div>
      </div>
      <motion.div
        id="limiter"
        className="absolute z-10 h-full w-1 bg-primary"
        drag="x"
        dragControls={dragControls}
        dragElastic={0}
        initial={{ left: `${limiterPosition * 100}%` }}
        style={{
          transform: `translateX(-50%)`,
        }}
        onPan={handleDrag}
        dragMomentum={false}
        dragConstraints={containerRef}
      >
        <div className="relative h-full w-full">
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary" />
        </div>
      </motion.div>
    </div>
  );
}
