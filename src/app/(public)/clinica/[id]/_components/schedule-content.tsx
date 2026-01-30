"use client"

import { Prisma } from "@/generated/prisma/client"
import { MapPin } from "lucide-react"
import Image from "next/image"
import doctorDefault from "../../../../../../public/doctor-default.png";
import { AppointmentFormData, useAppointmentForm } from "./schedule-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { formatPhone } from "../../../../../utils/formatPhone";
import { DateTimePicker } from "./date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exibirHora } from "@/utils/timeConvert";
import { Button } from "@/components/ui/button";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true,
    }
}>

interface ScheduleContentProps {
    clinic: UserWithServiceAndSubscription
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {

    const form = useAppointmentForm();
    const { watch } = form;

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />

            <section className="container mx-auto px-4 -mt-16">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-8">
                            <Image src={clinic.image ? clinic.image : doctorDefault} alt="foto da clinica" className="object-cover" fill />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">{clinic.name ? clinic.name : "Nome da clinica não encontrado"}</h1>

                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{clinic.address ? clinic.address : "Endereço não encontrado"}</span>
                        </div>
                    </article>

                </div>
            </section>

            <section className="max-w-2xl mx-auto w-full mt-5">
                <Form {...form}>
                    <form className="mx-auto space-y-6 bg-white p-6 border rounded-md shadow">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <div>
                                    <FormItem>
                                        <Label className="font-semibold" htmlFor="name">Nome completo:</Label>
                                        <FormControl>
                                            <Input id="name" placeholder="Digite seu nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage className="font-semibold mt-1" />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <div>
                                    <FormItem>
                                        <Label className="font-semibold" htmlFor="email">Email:</Label>
                                        <FormControl>
                                            <Input id="Email" placeholder="Digite seu Email" {...field} />
                                        </FormControl>
                                        <FormMessage className="font-semibold mt-1" />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <div className="space-y-6 md:flex md:space-y-0 md:justify-between md:gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <div>
                                        <FormItem className="flex flex-col md:w-xs">
                                            <Label className="font-semibold" htmlFor="phone">Telefone:</Label>
                                            <FormControl>
                                                <Input {...field} id="phone" placeholder="(XX) XXXX-XXXX"
                                                    onChange={(e) => {
                                                        const formattedPhone = formatPhone(e.target.value);
                                                        field.onChange(formattedPhone);
                                                    }} />
                                            </FormControl>
                                            <FormMessage className="font-semibold mt-1" />
                                        </FormItem>
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <div>
                                        <FormItem className="flex items-center gap-2 md:flex-col md:w-xs">
                                            <Label className="font-semibold" htmlFor="date">Data do agendamento:</Label>
                                            <FormControl>
                                                <DateTimePicker
                                                    initialDate={new Date()}
                                                    className="w-full rounded border p-2"
                                                    onChange={(date) => {
                                                        if (date) {
                                                            field.onChange(date);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage className="font-semibold mt-1" />
                                        </FormItem>
                                    </div>
                                )}
                            />

                        </div>

                        <FormField
                            control={form.control}
                            name="serviceId"
                            render={({ field }) => (
                                <div>
                                    <FormItem>
                                        <Label className="font-semibold" htmlFor="serviceId">Serviço:</Label>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full rounded border p-2 text-left">
                                                    <SelectValue placeholder="Selecione um serviço" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {(clinic.services ?? []).map((service) => (
                                                        <SelectItem key={service.id} value={service.id}>{service.name} - {exibirHora(service.duration, service.duration)}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="font-semibold mt-1" />
                                    </FormItem>
                                </div>
                            )}
                        />

                        <Button
                        className="bg-emerald-500 hover:bg-emerald-400 w-full" 
                        type="submit" 
                        disabled={!watch("name") || !watch("email") || !watch("phone")}>
                            Agendar Consulta
                        </Button>
                    </form>
                </Form>
            </section>

        </div>
    )
}