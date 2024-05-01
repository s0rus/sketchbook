import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import Link from "next/link";
import ledger from "../../../public/assets/ledger.png";

export function Header() {
  return (
    <header className="mb-8 mt-8 flex flex-col items-center justify-between gap-y-4 pb-8 md:mt-16 md:flex-row md:gap-y-0 lg:mb-40">
      <div className="order-1 flex items-center gap-x-4 md:order-[0]">
        <Image src={ledger} alt="" width={32} height={32} />
        <h1 className="text-xl font-bold leading-5 tracking-tighter">sketchbook.</h1>
      </div>
      <nav>
        <Link href="https://devsor.us/" target="_blank">
          <Icon.brandLogo className="h-8 w-auto" />
        </Link>
      </nav>
    </header>
  );
}
