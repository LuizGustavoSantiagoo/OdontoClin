'use server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { success, z } from 'zod'
import Dashboard from '../../page'
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome do serviço é obrigatorio!" }),
    price: z.number().min(1, { message: "O service precisa ter um valor!" }),
    duration: z.number(),
})

type FormSchema = z.infer<typeof formSchema>

export async function createNewService(formData: FormSchema) {


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

        const newService = await prisma.service.create({
            data: {
                name: formData.name,
                duration: formData.duration,
                price: formData.price,
                userId: session?.user?.id
            }
        })

        revalidatePath("/dashboard/services")

        return {
            data: newService
        }

    } catch (err) {
        return {
            error: "error ao cadastrar serviço"
        }
    }
}