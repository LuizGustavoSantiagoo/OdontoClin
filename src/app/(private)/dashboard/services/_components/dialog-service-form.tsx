import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
    name: z.string().min(1, "O nome do serviço é obrigatorio!"),
    price: z.string().min(1, "O valor do serviço é obrigatorio!"),
    hours: z.string(),
    minutes: z.string(),
})

export interface UseDialogServiceProps {
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
    }
}

export type DialogServiceFormData = z.infer<typeof formSchema>

export function useDialogServiceForm({ initialValues }: UseDialogServiceProps) {
    return useForm<DialogServiceFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: "",
            price: "",
            hours: "",
            minutes: "",
        }
    })
}