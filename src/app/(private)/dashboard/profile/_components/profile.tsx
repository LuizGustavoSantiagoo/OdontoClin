"use client"
import { useState } from "react";
import { ProfileFormData, useProfileForm } from "./profile-form";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import imgText from "../../../../../../public/foto1.png"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prisma } from "@/generated/prisma/client";
import { updateProfile } from "../_actions/update_profile";
import { toast } from "sonner";
import { cleanPhone, formatPhone } from "@/utils/formatPhone";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export type userWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true
    }
}>

interface ProfileContentProps {
    user: userWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {

    const router = useRouter();
    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
    const [dialogIsOpen, setDialog] = useState(false);
    const { update } = useSession();

    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timezone
    });

    function generateTimeSlots(): string[] {
        const hours: string[] = [];

        for (let i = 8; i <= 24; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, "0");
                const minutes = (j * 30).toString().padStart(2, "0");

                hours.push(`${hour}:${minutes}`)
            }
        }

        return hours;
    }

    const hours = generateTimeSlots();

    function toogleHour(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const zones = Intl.supportedValuesOf("timeZone").filter((zone) =>
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Boa_Vista") ||
        zone.startsWith("America/Cuiaba")
    )

    async function onSubmit(v: ProfileFormData) {

        const clean = cleanPhone(v.phone || "");

        const response = await updateProfile({
            name: v.name,
            status: v.status === 'ATIVO' ? true : false,
            timezone: v.timezone,
            address: v.address,
            phone: clean,
            times: selectedHours || [],
        });

        if (response.erro) {
            toast.warning(response.erro, { closeButton: true, position: "top-center" })
            return;
        }

        toast.success(response.data, { closeButton: true, position: "top-center" })
    }

    async function handleLogout() {
        signOut();
        await update();
        router.replace("/");
    }

    return (
        <div className="mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader className="font-bold text-2xl">
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <div className="flex justify-center ">
                                <div className="relative w-40 h-40 rounded-full overflow-auto bg-gray-200">
                                    <Image src={user.image ?? imgText} alt="" fill className="object-cover" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col ">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="font-bold">
                                                    Nome Completo:
                                                </Label>
                                                <FormControl>
                                                    <Input placeholder="Nome" {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>

                                <div className="flex flex-col ">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="font-bold">
                                                    Endereço:
                                                </Label>
                                                <FormControl>
                                                    <Input placeholder="Informe o endereço da clinica" {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>

                                <div className="flex flex-col ">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="font-bold">
                                                    Telefone:
                                                </Label>
                                                <FormControl>
                                                    <Input placeholder="Digite seu telefone" {...field}
                                                        onChange={(e) => {
                                                            const formattedValue = formatPhone(e.target.value)
                                                            field.onChange(formattedValue)
                                                        }}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>

                                <div className="flex flex-col ">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="font-bold">Status:</Label>

                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value ? "ATIVO" : "INATIVO"}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            <SelectItem value="ATIVO">
                                                                Ativo
                                                            </SelectItem>

                                                            <SelectItem value="INATIVO">
                                                                Inativo
                                                            </SelectItem>

                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold">Configurar Horarios da clinica:</Label>

                                    <Dialog open={dialogIsOpen} onOpenChange={setDialog}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className="w-full justify-between hover:bg-emerald-500 hover:text-white">
                                                Configurar Horarios <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-center">
                                                    Horarios da Clinica
                                                </DialogTitle>
                                                <DialogDescription className="text-center">
                                                    Selecione abaixo os horarios de funcionamento da clinica
                                                </DialogDescription>

                                                <section>
                                                    <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
                                                        {hours.map((hour) => (
                                                            <Button
                                                                key={hour}
                                                                variant={"outline"}
                                                                onClick={() => toogleHour(hour)}
                                                                className={cn('border-1 border-gray-50', selectedHours.includes(hour) && 'border-emerald-500 border-2')}>
                                                                {hour}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </section>

                                                <Button
                                                    variant={"outline"}
                                                    className="w-full bg-emerald-500 text-white"
                                                    onClick={() => setDialog(false)}
                                                >
                                                    Fechar
                                                </Button>

                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="flex flex-col ">
                                    <FormField
                                        control={form.control}
                                        name="timezone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="font-bold">Fuso Horario:</Label>

                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            {
                                                                zones.map((zone) => (
                                                                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                                                                ))
                                                            }

                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>
                                    </FormField>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-500 text-white"
                                    variant={"outline"}>
                                    Salvar
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
            <section className="mt-4">
                <Button 
                variant="destructive"
                onClick={() => {handleLogout()}}>
                    Sair da conta  <LogOut className="w-5 h-5"/>
                </Button>
            </section>
        </div>
    )
}