"use client"

import { DialogHeader } from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-service-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { convertRealToCents } from "@/utils/convertCurrency"
import { createNewService } from "../_actions/create-service"
import { toast } from "sonner"
import { useState } from "react"
import { updateService } from "../_actions/update-service"

interface DialogServiceProps {
    closeModal: () => void;
    serviceId?: string,
    initialValues?: {
        name: string,
        price: string,
        hours: string,
        minutes: string
    }
}



export function DialogService({ closeModal, serviceId, initialValues }: DialogServiceProps) {

    const form = useDialogServiceForm({ initialValues: initialValues })
    const [isLoading, setIsLaoding] = useState(false)

    async function onSubmit(v: DialogServiceFormData) {
        setIsLaoding(true);

        const priceInCents = convertRealToCents(v.price)
        const hours = parseInt(v.hours) || 0;
        const minutes = parseInt(v.minutes) || 0;

        const duration = (hours * 60) + minutes;

        if (serviceId) {
            await editServiceById({
                serviceId: serviceId,
                name: v.name,
                priceInCents: priceInCents,
                duration: duration
            })

            return;
        }

        const response = await createNewService({
            name: v.name,
            duration: duration,
            price: priceInCents,
        })

        setIsLaoding(false);

        if (response.error) {
            toast.warning(response.error, { closeButton: true, position: "top-center" })
            return;
        }

        toast.success("Serviço criado com sucesso!", { closeButton: true, position: "top-center" })
        handleCloseModal();
    }

    async function editServiceById({ serviceId, name, priceInCents, duration }: { serviceId: string, name: string, priceInCents: number, duration: number }) {
        setIsLaoding(true);

        const response = await updateService({ serviceId: serviceId, name: name, price: priceInCents, duration: duration })

        setIsLaoding(false)

        if (response.error) {
            toast.warning(response.error, { closeButton: true, position: "top-center" })
            return
            handleCloseModal();
        }

        toast.success(response.data, { closeButton: true, position: "top-center" })
        handleCloseModal();
    }

    function handleCloseModal() {
        closeModal();
        form.reset();
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value.replace(/\D/g, "")

        if (!rawValue) {
            event.target.value = ""
            form.setValue("price", "")
            return
        }

        const cents = parseInt(rawValue, 10)
        const formatted = (cents / 100).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })

        event.target.value = formatted
        form.setValue("price", formatted)
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                    Novo Serviço
                </DialogTitle>

                <DialogDescription>
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Nome de Serviço:</FormLabel>

                                    <FormControl>
                                        <Input {...field}
                                            placeholder="Digite o nome do serviço:" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Valor do Serviço:</FormLabel>

                                    <FormControl>
                                        <Input {...field}
                                            placeholder="Digite um valor ao serviço: 120,00"
                                            onChange={changeCurrency} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="font-semibold text-center my-2 underline">Tempo de duração do serviço</p>
                        <div className="flex flex-row justify-around">

                            <FormField
                                control={form.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Horas:</FormLabel>

                                        <FormControl>
                                            <Input {...field}
                                                placeholder="1"
                                                min="0"
                                                type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="minutes"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Minutos:</FormLabel>

                                        <FormControl>
                                            <Input {...field}
                                                placeholder="0"
                                                min="0"
                                                type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full font-semibold text-white mt-3"
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : `${serviceId ? "Atualizar" : "Cadastrar"}`}
                        </Button>
                    </div>

                </form>
            </Form>
        </>
    )
}