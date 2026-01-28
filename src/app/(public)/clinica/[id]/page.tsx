import { redirect } from "next/navigation";
import { getInfoSchedule } from "./_data-access/get-info-schedule";

export default async function SchedulePage({params, } : {params: Promise<{id: string}>}) {

    const userId = (await params).id;

    const infoSchedule = await getInfoSchedule({ userId: userId });
    
    if(!infoSchedule) {
        redirect("/")
    }

    return (
        <div></div>
    )
}