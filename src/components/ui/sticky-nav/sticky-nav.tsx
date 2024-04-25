import { ThemeToggle } from "../theme-toggle";
import { ComponentScroller } from "./component-scroller";
import { ScrollToTopButton } from "./scroll-to-top-button";

export function StickyNav(props: { componentCount: number }) {
  return (
    <div className="relative h-full w-full">
      <div className="sticky top-10 flex w-full items-center justify-center">
        <nav className="flex flex-col gap-2 rounded-full border border-foreground/5 bg-secondary p-2">
          <ThemeToggle />
          <ComponentScroller componentCount={props.componentCount} />
          <ScrollToTopButton />
        </nav>
      </div>
    </div>
  );
}
