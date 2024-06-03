'use client '
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Section1() {
    const router = useRouter();

    const handleClick = () => {
        router.push("../auth/register");
      }

    return (
        <section className="ml-3 grid " style={{ gridTemplateColumns: ".4fr .6fr  " }}>
            <div className="py-12">
                <h1 className="text-4xl font-semibold">Scooping Better <span className="text-primary">Deals</span> for Student</h1>
                <p className="mt-4 text ">Register now to get the best available deals in town</p>
                <div className="flex gap-8 text-sm mt-4">
                    <Button className="mr-4" onClick={handleClick}>
                       Sign-up
                    </Button>
                    <Button variant="ghost">
                        Learn more
                    </Button>
                </div>
            </div>
            <div className="relative" style={{ width: "100%", height: "100%" }}>
                <Image src={"/assets/images/logo.png"} layout="fill" objectFit="contain" alt="logo"/>
            </div>
        </section>
    );
}
