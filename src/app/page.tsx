import { sketches } from "@/components/sketches";
import { BlinkingLink } from "@/components/ui/blinking-link";
import { Icon } from "@/components/ui/icon";
import { StickyNav } from "@/components/ui/sticky-nav/sticky-nav";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col">
      <header className="mb-16 flex flex-col items-center justify-between gap-y-4 pb-8 pt-16 md:flex-row md:gap-y-0 lg:mb-40">
        <div className="order-1 flex items-center gap-x-4 md:order-[0]">
          <Icon.sketchbook className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold leading-5 tracking-tighter">
              <BlinkingLink />
              sketchbook.
            </h1>
            <p className="text-muted-foreground/20">
              just trying and learning random stuff
            </p>
          </div>
        </div>
        <nav>
          <Link href="https://devsor.us/" target="_blank">
            <Icon.brandLogo className="h-8 w-auto" />
          </Link>
        </nav>
      </header>
      <div className="grid grid-cols-[48px,auto] gap-x-8">
        <StickyNav componentCount={sketches.length} />
        <section className="flex w-full flex-shrink-0 flex-col gap-y-24">
          {sketches.map((sketch) => (
            <article
              key={sketch.title}
              id={sketch.title.replace(/\s/g, "-").toLowerCase()}
              className="flex flex-col items-start gap-y-4 lg:flex-row lg:gap-x-24 lg:gap-y-0"
            >
              <div className="max-w-full lg:max-w-[30ch]">
                <h2 className="mb-1 font-mono text-base text-muted-foreground/95">
                  {sketch.title}
                </h2>
                <p className="mb-4 text-sm text-muted-foreground/40">
                  {sketch.description}
                </p>
                <ul className="flex flex-wrap gap-x-1 gap-y-2 text-muted-foreground/40">
                  {sketch.tags.map((tag) => (
                    <li
                      key={`${sketch.title}-${tag}`}
                      className="rounded-full bg-muted px-2 py-1 font-mono text-xs tracking-tighter text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg border border-muted p-4 shadow-lg md:h-[640px]">
                {sketch.component}
                <div
                  className={
                    "absolute -left-5 h-full w-12 bg-[url('/assets/ring.svg')] bg-repeat-space"
                  }
                ></div>
              </div>
            </article>
          ))}
        </section>
      </div>
      <footer className="flex items-center justify-between pb-8 pt-16 text-muted-foreground/20">
        piotr mól &copy; 2024
      </footer>
    </main>
  );
}
