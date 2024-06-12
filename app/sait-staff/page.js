/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1IwPpiAmsdt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Dashboard from './Dashboard'
import { Button } from "@/components/ui/button"
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { LuMails } from "react-icons/lu";

export default function Component() {
  return (
    <div className="flex min-h-screen">
      <nav className=" bg-primary text-white w-70 p-6 hidden md:block">
        <div className="mb-6 ml-4">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <span>Student Scoops</span>
          </Link>
        </div>
        <div className="space-y-4">
          <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
            <AiOutlineHome className="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
            <AiOutlineTeam className="h-6 w-6" />
            <span>Student Management</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
            <AiOutlineShop className="h-6 w-6" />
            <span>Stores Management</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
            <AiOutlineSetting className="h-6 w-6" />
            <span>Setting</span>
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex flex-col">
        <header className="bg-white  px-4 py-3 flex items-center justify-between ">
          <h1 className="">Hi! Name</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <LuSearch className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LuMails className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </header>
        <div>
          <Dashboard />
        </div>
        <main className="flex-1 p-6" />
      </div>
    </div>
  )
}







