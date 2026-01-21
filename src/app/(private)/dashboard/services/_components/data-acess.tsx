import { User } from "lucide-react";
import { getAllServives } from "../_data-acess/get-all-services"

interface ServicesContentProps {
    UserId: string
}

export async function ServicesContent({ UserId }: ServicesContentProps) {
    
    const services =  await getAllServives({ UserId : UserId });

    return (
        <div>

        </div>
    )
}