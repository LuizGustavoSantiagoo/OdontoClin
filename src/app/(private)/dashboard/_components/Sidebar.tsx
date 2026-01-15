"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CalendarCheck2, ChevronLeft, Settings, List, StethoscopeIcon, Settings2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../../../../public/logo-odonto.png";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function SidebarDashboard({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">

            <aside className={clsx("flex flex-col border-r bg-background transition-all duration-500 p-4 h-full",
                {
                    "w-20": isOpen,
                    "w-64": !isOpen,
                    "hidden md:flex md:fixed": true
                }
            )}>

                <div className="mb-3 mt-4">
                    {!isOpen && (
                        <Image
                            src={logo}
                            alt="OdontoPRO Logo"
                            style={{
                                width: 'auto',
                                height: 'auto',
                            }}
                            className="mx-auto mb-8"
                            priority
                            quality={100}

                        />)}
                </div>

                <Button
                    className="bg-gray-100 hover:bg-gray-200 text-zinc-900 self-end mb-2 shadow-lg"
                    onClick={() => { setIsOpen(!isOpen) }}>

                    {!isOpen ?
                        <ChevronLeft className="w-12 h-12" />
                        :
                        <ChevronLeft className="w-12 h-12 rotate-180" />
                    }
                </Button>

                {
                    isOpen && (
                        <nav className="flex flex-col gap-1 overflow-hidden mt-2">
                            <SidebarLink
                                href="/dashboard"
                                label="Agendamentos"
                                icon={<CalendarCheck2 />}
                                pathname={pathname}
                                isOpen={isOpen}
                            />

                            <SidebarLink
                                href="/dashboard/services"
                                label="Services"
                                icon={<StethoscopeIcon />}
                                pathname={pathname}
                                isOpen={isOpen}
                            />

                            <SidebarLink
                                href="/dashboard/profile"
                                label="Profile"
                                icon={<Settings2 />}
                                pathname={pathname}
                                isOpen={isOpen}
                            />
                        </nav>
                    )
                }

                <Collapsible open={!isOpen}>
                    <CollapsibleContent>
                        <nav className="flex flex-col gap-1 overflow-hidden">
                            <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                                Panel
                            </span>

                            <SidebarLink
                                href="/dashboard"
                                label="Appointments"
                                icon={<CalendarCheck2 />}
                                pathname={pathname}
                                isOpen={isOpen}
                            />

                            <SidebarLink
                                href="/dashboard/services"
                                label="Services"
                                icon={<StethoscopeIcon />}
                                pathname={pathname}
                                isOpen={isOpen}
                            />

                            <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                                Account
                            </span>
                            <SidebarLink
                                href="/dashboard/profile"
                                label="Profile"
                                icon={<Settings2 />}
                                pathname={pathname}
                                isOpen={isOpen}
                            />
                        </nav>
                    </CollapsibleContent>
                </Collapsible>

            </aside>

            <div className={
                clsx("flex flex-1 flex-col transition-all duration-300", {
                    "md:ml-20": isOpen,
                    "md:ml-50": !isOpen
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
                                <span className="text-base font-semibold mt-3 underline">Menu</span>
                            </SheetTitle>

                            <nav className="grid gap-6 text-base pt-5">
                                <SidebarLink
                                    href="/dashboard"
                                    label="Agendamentos"
                                    icon={<CalendarCheck2 />}
                                    pathname={pathname}
                                    isOpen={isOpen}
                                />

                                <SidebarLink
                                    href="/dashboard/services"
                                    label="Services"
                                    icon={<StethoscopeIcon />}
                                    pathname={pathname}
                                    isOpen={isOpen}
                                />

                                <span className="text-sm text-gray-400 font-medium mt-1 uppercase text-center">
                                    Account
                                </span>
                                <SidebarLink
                                    href="/dashboard/profile"
                                    label="Profile"
                                    icon={<Settings2 />}
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
        <Link
            href={href}
            className={
                clsx(
                    "flex items-center gap-3 rounded-md px-2 py-2 transition-colors mx-2",
                    {
                        "bg-emerald-100 text-emerald-600": pathname === href,
                        "text-slate-600 hover:bg-slate-100 hover:text-slate-900": pathname !== href
                    },
                    {
                        "md:bg-transparent justify-center": isOpen,
                        "justify-start": !isOpen
                    }
                )
            }
        >
            <span className="text-xl text-current">
                {icon}
            </span>
            <span className={clsx("text-sm font-medium", { "md:hidden": isOpen })}>
                {label}
            </span>
        </Link>
    );
}