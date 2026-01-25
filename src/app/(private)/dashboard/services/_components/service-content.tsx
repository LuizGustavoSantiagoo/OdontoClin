import { getAllServives } from "../_data-acess/get-all-services"
import { ServiceList } from "./service-list";

interface ServicesContentProps {
    UserId: string
}

export async function ServicesContent({ UserId }: ServicesContentProps) {

    const services = await getAllServives({ UserId: UserId });

    return (
        <div>
            <ServiceList services={services.data || []}/>

        </div>
    )
}