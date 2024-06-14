'use client'
import Link from "next/link";
import Dashboard from './Dashboard';
import { Button } from "@/components/ui/button";
import { AiOutlineTeam, AiOutlineShop, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import SaitStaffNav from "@/components/SaitStaffNav";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';

export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen mx-auto" 
       style={{ 
        backgroundImage: "url(/assets/images/salade.jpg)",
        backgroundSize: "cover", // the size of the background image
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the background image from repeating
          }}>
      <SaitStaffNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col mx-auto transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="flex justify-between items-center px-4 py-3 mt-2 mr-5">
          <h1 className="text-lg text-white font-bold inline-flex ml-5"> <CgProfile  className="mr-2 h-5 w-5 mt-1" /> Hi! Name</h1>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]">
            <LuLogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
        </div>
        <div className="flex-1 p-6">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
