import auth from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const session = await auth();

    if(!session) {
        redirect("/");
    }

    return (<h1>Dashboard Page</h1>);
}