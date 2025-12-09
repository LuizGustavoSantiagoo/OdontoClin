import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from '../../../../public/doctor-hero.png';

export function Hero() {
    return (
        <section>
            <div className="container mx-auto px-4 pt-20 pb-4 sm:pb-2 sm:px-6 lg:px-8">

                <main className="flex items-center justify-between">
                    <article className="flex-2 max-w-3xl space-y-8 flex flex-col justify-center">

                        <h1 className="text-4xl font-bold max-w-2xl tracking-tight">
                            Encontre os melhores profissionais em um local!
                        </h1>
                        <p className="text-base md:text-lg text-gray-600">
                            Nós somos uma plataforma para profissionais da saude com foco em agilizar sem atendimneto de forma simplificada e organizada.
                        </p>

                        <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 w-fit font-semibold">
                            Encontre uma clinica
                        </Button>
                    </article>

                    <div className="hidden lg:block">
                        <Image 
                        src={doctorImage} 
                        alt="doctor iamge"
                        width={340}
                        height={400}
                        className="object-contain"
                        quality={100} 
                        priority/>
                    </div>
                </main>

            </div>
        </section>
    )
}