"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import z from "zod"

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatorio" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.boolean(),
    timezone: z.string(),
    times: z.array(z.string()),
})

type FormSchema = z.infer<typeof formSchema>

export async function updateProfile(formData: FormSchema) {

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "usuario não encontrado"
        }
    }

    const schema = formSchema.safeParse(formData)


    if (!schema.success) {
        return {
            error: schema.error
        }
    }

    try {
        await prisma.user.update({
            where: {
                id: session?.user?.id
            },
            data: {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                status: formData.status,
                times: formData.times || [],
                timeZone: formData.timezone,
            }
        })

        revalidatePath("/dashboard/profile")

        return {
            data: "clinica atualizada"
        }

    } catch (err) {
        return {
            erro : "Error ao Salvar"
        }
    }
}