import Link from "next/link";
import Dashboard from './Dashboard';
import { Button } from "@/components/ui/button";
import { AiOutlineTeam, AiOutlineShop, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import SaitStaffNav from "@/components/SaitStaffNav";
import { CgProfile } from "react-icons/cg";

export default function Component() {
  return (
    <div className="flex min-h-screen" style={{ backgroundImage: "linear-gradient(115deg, #dfc42f, #faf7df)" }}>
      <SaitStaffNav />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-4 py-3">
          <h1 className="text-lg font-bold inline-flex"> <CgProfile  className="mr-2 h-5 w-5 mt-1" /> Hi! Name</h1>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]">
            <LuLogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
        </div>
        <div>
          <Dashboard />
        </div>
        <main className="flex-1 p-6" />
      </div>
    </div>
  );
}
