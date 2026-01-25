'use server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import Dashboard from '../../page'
import { revalidatePath } from 'next/cache'
import { ca } from 'zod/v4/locales'

const formSchema = z.object({
    id: z.string().min(1, "o ID é obrigatorio")
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteService(formData: FormSchema) {

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "usuario não logado"
        }
    }

    const schema = formSchema.safeParse(formData);

    if (!schema.success) {
        return {
            error: schema.error?.issues[0].message
        }
    }

    try {

        await prisma.service.update({
            where: {
                id: formData.id,
                userId: session?.user?.id
            },
            data: {
                status: false
            }
        })

        revalidatePath('/dashboard/services');

        return {
            data: "Serviço deletado com sucesso"
        }

    } catch (err) {

        return {
            error: "falaha ao deletar serviço"
        }
    }
}