import { sketches } from "@/components/sketches";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { StickyNav } from "@/components/ui/sticky-nav/sticky-nav";

export default function Page() {
  return (
    <main className="container flex min-h-screen flex-col">
      <Header />
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-[48px,auto]">
        <StickyNav componentCount={sketches.length} />
        <section className="flex w-full flex-shrink-0 flex-col gap-y-24">
          {sketches.map((sketch) => (
            <article
              key={sketch.title}
              id={sketch.title.replace(/\s/g, "-").toLowerCase()}
              className="flex flex-col items-start gap-y-4 lg:flex-row lg:gap-x-24 lg:gap-y-0"
            >
              <div className="max-w-full lg:max-w-[30ch]">
                <h2 className="mb-1 text-pretty font-mono text-base text-muted-foreground/95">{sketch.title}</h2>
                <p className="mb-4 text-pretty text-sm text-muted-foreground/40">{sketch.description}</p>
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
              <div className="relative flex max-h-[640px] w-full flex-1 items-center justify-center rounded-lg border border-muted p-4 pl-8 shadow-lg md:h-[640px]">
                {sketch.component}
                <div className={"absolute -left-5 h-full w-12 bg-[url('/assets/ring.svg')] bg-repeat-space"}></div>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
