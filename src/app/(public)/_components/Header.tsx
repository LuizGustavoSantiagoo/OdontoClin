'use client'
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/Login"

export function Header() {

  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Profissionais", href: "#" }
  ];


  async function handleLogin() {
    await handleRegister("github");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent text-black hover:bg-transparent hover:text-emerald-500 hover:underline  shadow-none"
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}

      {status === 'loading' ? (<></> ) : session ? (
        <Button
          onClick={() => setIsOpen(false)}
          asChild
          className="bg-transparent text-black hover:bg-transparent hover:text-emerald-500 hover:underline  shadow-none"
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button
          onClick={handleLogin}
          className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-none"
        >
          <LogIn />
          Login
        </Button>
      )}

    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-3xl text-shadow-zinc-900 font-bold" href="/">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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

            <nav className="flex flex-col space-y-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
