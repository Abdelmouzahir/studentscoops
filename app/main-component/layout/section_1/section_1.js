import Image from "next/image";

export default function section_1(){
    return(
        <section className="grid grid-cols-2">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">Scooping Better <span className="text-primary">Deals</span> for Student</h1>
                <p className="mt-4 ">Register now to get best available deals in town</p>
                <div>

                </div>
            </div>
            <div className="relative">
                <Image src={"/assets/images/logo.png"} layout={'fill'} objectFit={'contain'} alt="logo"/>
            </div>
            
        </section>
    );
}