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
              <button className="inline-flex items-center justify-center rounded-md bg-orange-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-blue-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300">
              <LuMails className=" mr-2 h-5 w-5" />
              Logout
              </button>
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







