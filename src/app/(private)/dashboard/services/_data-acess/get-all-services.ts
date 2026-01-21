"use server"
import prisma from "@/lib/prisma"


export async function getAllServives({ UserId }: { UserId: string }) {

    if (!UserId) {
        return {
            error: "Falha ao receer userid"
        }
    }

    try {

        const services = await prisma.service.findMany({
            where: {
                userId: UserId,
                status: true
            }
        })

        return {
            data: services
        }

    } catch (err) {
        return {
            error: "Falha ao buscar services"
        }
    }
}