'use client '
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Section1() {
    const router = useRouter();

    const handleClick = () => {
        router.push("../auth/register");
    }

    return (<>
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
                <Image src={"/assets/images/logo.png"} layout="fill" objectFit="contain" alt="logo" />
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-12 px-4 md:grid-cols-3 md:px-6">
                <div className="space-y-4 text-center">
                    <DiscIcon className="mx-auto h-12 w-12 text-orange-500" />
                    <h2 className="text-2xl font-bold">Discounted Leftovers</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Save up to 50% on delicious leftover meals from local restaurants and cafes.
                    </p>
                    <Button variant="link">Learn More</Button>
                </div>
                <div className="space-y-4 text-center">
                    <BuildingIcon className="mx-auto h-12 w-12 text-orange-500" />
                    <h2 className="text-2xl font-bold">Support Local Businesses</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Help reduce food waste and support your local community by ordering leftover meals.
                    </p>
                    <Button variant="link">Learn More</Button>
                </div>
                <div className="space-y-4 text-center">
                    <SmartphoneIcon className="mx-auto h-12 w-12 text-orange-500" />
                    <h2 className="text-2xl font-bold">Accessible on Multiple devices</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Easily browse, order, and track your leftover meals on multiple devices.
                    </p>
                    <Button variant="link">Learn More</Button>
                </div>
            </div>
        </section>
    </>
    );
}
function DiscIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="2" />
        </svg>)
    );
}
function BuildingIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>)
    );
}  
function SmartphoneIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke= "currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>)
    );
  }
