"use client"
import { use, useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, PlusIcon, X } from "lucide-react"
import { DialogService } from "./dialog-service"
import { Service } from "@/generated/prisma/client"
import { formatCurrency } from '@/utils/convertCurrency'
import { textUppercase } from "@/utils/textFormat"
import { deleteService } from "../_actions/delete-service"
import { toast } from "sonner"
import { exibirHora } from "@/utils/timeConvert"

interface ServicesListProps {
    services: Service[]
}

export function ServiceList({ services }: ServicesListProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [editingService, setEditingService] = useState<null | Service>(null)

    function closeModal() {
        setIsOpen(false)
    }

    async function handleDeleteService(id: string) {
        const response = await deleteService({ id: id });

        if (response.error) {
            toast.warning(response.error, { closeButton: true, position: 'top-center' });
        }

        toast.success(response.data, { closeButton: true, position: 'top-center' })
    }

    

    async function handleEditService(service: Service) {
        setEditingService(service);
        setIsOpen(true)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <section className="mx-auto">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>

                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent onInteractOutside={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                            setEditingService(null);
                        }}>
                            <DialogService
                                closeModal={() => {
                                    setIsOpen(false)
                                    setEditingService(null)
                                }}

                                serviceId={editingService ? editingService.id : undefined}

                                initialValues={editingService ? {
                                    name: editingService.name,
                                    price: (editingService.price / 100).toFixed(2).replace('.', ','),
                                    hours: Math.floor(editingService.duration / 60).toString(),
                                    minutes: (editingService.duration % 60).toString()
                                } : undefined}
                            />
                        </DialogContent>
                    </CardHeader>

                    <CardContent>
                        <section className="space-y-4">
                            {services.map((service) => (
                                <article key={service.id} className="flex flex-row justify-between items-center w-full p-2 rounded duration-500 hover:bg-gray-300 ">
                                    <div className="flex flex-row gap-2">
                                        <span className="font-semibold">{textUppercase(service.name)}</span>
                                        <span className="text-gray-400 font-semibold"> - </span>
                                        <span className="text-gray-400 font-semibold">{formatCurrency(service.price / 100)}</span>
                                        <span className="font-semibold">/</span>
                                        <span className="font-semibold">DURAÇÃO</span>
                                        <span className="text-gray-400 font-semibold"> - </span>
                                        <span className="text-gray-400 font-semibold">{exibirHora(service.duration, service.duration)}</span>

                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="border hover:border-amber-400 hover:text-amber-400"
                                            onClick={() => { handleEditService(service) }}>
                                            <Pencil />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="border hover:border-red-500 hover:text-red-500"
                                            onClick={() => { handleDeleteService(service.id) }}>
                                            <X />
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </CardContent>
                </Card>


            </section>
        </Dialog>
    )
}