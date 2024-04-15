"use client";

import { sketches } from "./sketches";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function ComponentScroller(props: { componentCount: number }) {
  function handleScrollToComponent(value: string) {
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-6 w-6 rounded-full p-0 font-mono text-xs font-bold tracking-tighter hover:bg-background/60"
              >
                {props.componentCount}
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            className="w-56"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuLabel>Scroll to</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup onValueChange={handleScrollToComponent}>
              {sketches.map((sketch) => (
                <DropdownMenuRadioItem
                  key={`${sketch.title}-scroller`}
                  value={sketch.title.replace(/\s/g, "-").toLowerCase()}
                  className="cursor-pointer"
                >
                  {sketch.title}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent side="right">
          <p>Scroll to component</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
