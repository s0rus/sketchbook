"use client";

import { Button } from "../button";
import { Icon } from "../icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

export function ScrollToTopButton() {
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="h-6 w-6 rounded-full p-0 font-mono text-xs font-bold tracking-tighter hover:bg-background/60"
            onClick={handleScrollToTop}
          >
            <Icon.arrowUp className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Scroll to top</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
