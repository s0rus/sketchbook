import { ThemeToggle } from "../theme-toggle";
import { ComponentScroller } from "./component-scroller";
import { ScrollToTopButton } from "./scroll-to-top-button";

export function StickyNav(props: { componentCount: number }) {
  return (
    <div className="relative h-full w-full md:block">
      <div className="transfrom fixed bottom-10 left-0 z-50 flex w-full items-center justify-center md:sticky md:top-10">
        <nav className="flex flex-row gap-2 rounded-full border border-foreground/5 bg-card p-2 md:flex-col">
          <ThemeToggle />
          <ComponentScroller componentCount={props.componentCount} />
          <ScrollToTopButton />
        </nav>
      </div>
    </div>
  );
}
