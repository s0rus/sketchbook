import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between pb-8 pt-16 text-muted-foreground/20 md:flex-row">
      <p>piotr mól &copy; 2024</p>
      <div className="flex flex-col items-center gap-x-2 md:flex-row">
        <span>
          website idea based on{" "}
          <Link href="https://www.uilabs.dev/" target="_blank" className="underline">
            uilabs.dev
          </Link>
        </span>
        <span>--</span>
        <span>built with next.js</span>
      </div>
    </footer>
  );
}
