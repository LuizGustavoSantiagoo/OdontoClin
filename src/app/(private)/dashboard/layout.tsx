import { SidebarDashboard } from "./_components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarDashboard> 
                <Toaster duration={2500}/>
                {children}
            </SidebarDashboard>
        </>
    )
}