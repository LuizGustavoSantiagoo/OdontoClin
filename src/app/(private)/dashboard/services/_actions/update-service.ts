'use server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import Dashboard from '../../page'
import { revalidatePath } from 'next/cache'
import { ca } from 'zod/v4/locales'
import { error } from 'console'

const formSchema = z.object({
    serviceId: z.string().min(1, "O id do serviço é obrigatorio!"),
    name: z.string().min(1, { message: "O nome do serviço é obrigatorio!" }),
    price: z.number().min(1, { message: "O service precisa ter um valor!" }),
    duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export async function updateService(formData: FormSchema) {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "usuario não logado"
        }
    }

    const schema = formSchema.safeParse(formData);

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    try {

        const service = await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId: session?.user.id
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration < 30 ? 30 : formData.duration,
            }
        })

        revalidatePath("/dashboard/services")

        return {
            data: "Serviço editado com sucesso!"
        }

    } catch(err) {
        return {
            error: "Erro ao editar serviço"
        }
    }
}