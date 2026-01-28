import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseProfileFormProps {
    name: string | null;
    address: string | null;
    phone: string | null;
    status: boolean;
    timeZone: string | null;
}

const profileSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatorio" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timezone: z.string().min(1, { message: "O timezone é Obrigatorio" })
})

export type ProfileFormData = z.infer<typeof profileSchema>

export function useProfileForm({ address, name, phone, status, timeZone }: UseProfileFormProps) {
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: name || "",
            address: address || "",
            phone: phone || "",
            status: status ? "ATIVO" : "INATIVO",
            timezone: timeZone || "",
        }
    })
}