import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-3xl text-shadow-zinc-900 font-bold" href="/">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center">
          <a href="">Profissionais</a>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover:bg-black hover:text-white"
              variant="ghost"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className=" w-[50%] z-[9999]">
            <SheetHeader className="text-center">
              <SheetTitle className="text-2xl">Menu</SheetTitle>
              <SheetDescription className="text-md">
                Veja nossos links
              </SheetDescription>
            </SheetHeader>

            <nav className="ml-5 underline">
              <a href="">Profissionais</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
