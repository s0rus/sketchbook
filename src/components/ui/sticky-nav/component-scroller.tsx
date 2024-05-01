"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { sketches } from "../../sketches";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

export function ComponentScroller(props: { componentCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleScrollToComponent(value: string) {
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  useEffect(() => {
    handleScrollToComponent(searchParams.get("c") ?? "");
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-6 w-6 rounded-full border border-muted-foreground p-0 font-mono text-xs font-bold tracking-tighter hover:bg-background/60"
              >
                {props.componentCount}
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel>Scroll to</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              onValueChange={(v) => {
                router.push(pathname + "?" + createQueryString("c", v), {
                  scroll: false,
                });
              }}
            >
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
