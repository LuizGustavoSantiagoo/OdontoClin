import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserData } from "../profile/_data-acess/get-info-user";
import { ServicesContent } from "./_components/data-acess";

export default async function Service() {

    const session = await auth();
    
      if (!session) {
        redirect("/");
      }
    
      const user = await getUserData({userId: session.user?.id})
    
      if (!user) {
        redirect("/");
      }

    return(
        <ServicesContent UserId={session?.user?.id!} />
    );     
}