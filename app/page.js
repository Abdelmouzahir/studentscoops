import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" ml-10 mt-10 flex min-h-screen">
    <div className="z-10 max-w-5xl w-full items-center justify-start font-mono text-sm lg:flex text-lg flex-col">
      <h1 className="w-full text-lg">Test Navigation</h1>
      <div className="text-lg flex items-center justify-start w-full">
      <Link href="/drivers"><text> Driver</text></Link>
      </div>
      <div className="text-lg flex items-center justify-start w-full">
      <Link href="/sait-staff"><text> sait Staff</text></Link>
      </div>
      <div className="text-lg flex items-center justify-start w-full">
      <Link href="/stores"><text> stores</text></Link>
      </div>
      <div className="text-lg flex items-center justify-start w-full">
      <Link href="/student"><text> Student</text></Link>
      </div>
    </div>
  </main>
  );
}
