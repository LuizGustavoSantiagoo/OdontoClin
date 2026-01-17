"use client"
import { useProfileForm } from "./profile-form";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import imgText from "../../../../../../public/foto1.png"

export function ProfileContent() {

    const form = useProfileForm();


    return (
        <div className="mx-auto">
            <Form {...form}>
                <form>
                    <Card>
                        <CardHeader className="font-bold text-2xl">
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <div className="flex justify-center ">
                                <div className="relative w-40 h-40 rounded-full overflow-auto bg-gray-200">
                                    <Image src={imgText} alt="" fill className="object-cover" />
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
                                                    <Input placeholder="Digite seu telefone" {...field}></Input>
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
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}