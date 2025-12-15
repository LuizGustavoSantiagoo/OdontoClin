import { SidebarDashboard } from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarDashboard> 
                {children}
            </SidebarDashboard>
        </>
    )
}