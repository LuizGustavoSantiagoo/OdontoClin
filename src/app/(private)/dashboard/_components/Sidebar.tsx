"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CalendarCheck2, Link, List } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">

            <div className={
                clsx("flex flex-1 flex-col transition-all duration-300", {
                    "md: ml-20": isOpen,
                    "md:ml-64": !isOpen
                })}>

                <header className="md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white">
                    <Sheet>
                        <div className="flex items-center justify-between gap-4 w-full">

                            <h1 className="text-base font-bold text-black">
                                Odonto<span className="text-emerald-500 hover:text-emerald-600">PRO</span>
                            </h1>

                            <SheetTrigger asChild >
                                <Button variant={"outline"} size="icon" className="md:hidden ">
                                    <List className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                        </div>

                        <SheetContent side="right" className="sm:max-w-xs text-black">
                            <SheetTitle className="mb-4 text-lg font-bold text-center">
                                <h2 className="text-base font-semibold mt-3 underline">Menu</h2>
                            </SheetTitle>

                            <nav className="grid gap-6 text-base pt-5">
                                <SidebarLink
                                    href="/dashboard"
                                    label="Agendamentos"
                                    icon={<CalendarCheck2 />}
                                    pathname={pathname}
                                    isOpen={isOpen}
                                />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>

                <main className="flex-1 py-4 px-2 md:p-6">
                    {children}
                </main>
            </div>

        </div>
    );
}

interface SidebarItemProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    pathname: string;
    isOpen: boolean;
}

function SidebarLink({ href, label, icon, pathname, isOpen }: SidebarItemProps) {

    return (
        <div className="flex items-center gap-2 bg-blue-500 px-3 py-2 rounded-md text-white">
            <Link href={href}>
                <span className="w-6 h-6">{icon}</span>
                {!isOpen && <span className="text-white">{label}</span>}
            </Link>
        </div>
    );
}