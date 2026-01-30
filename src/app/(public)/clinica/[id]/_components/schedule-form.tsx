"use client"

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const appointmenSchema = z.object({
    name: z.string().min(1, "O nome é obrigatorio!"),
    email: z.string().email("Digite um email valido!"),
    phone: z.string().min(1, "O telefone é obrigatorio!"),
    date: z.date(),
    serviceId: z.string().min(1, "O serviço é obrigatorio!"),
});

export type AppointmentFormData = z.infer<typeof appointmenSchema>;

export function useAppointmentForm() {
    return useForm<AppointmentFormData>({
        resolver: zodResolver(appointmenSchema),
        defaultValues: { 
            name: "", 
            email: "", 
            phone: "",
            serviceId: "",
            date: new Date(),
        },
    });
}