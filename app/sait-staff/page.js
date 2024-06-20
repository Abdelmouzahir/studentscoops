'use client';
import Link from "next/link";
import SDashboard from './SDashboard';
import RDashboard from './RDashboard';
import Dash from "./overviewDash";
import Settings from "./settingS";
import { Button } from "@/components/ui/button";
import { AiOutlineTeam, AiOutlineShop, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
//import navbar
import SaitStaffNav from "@/components/SaitStaffNav";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('student'); // Set default active tab
  const router = useRouter();

  // function to select the tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

 function handeLogoutClick() {
    // handle logout click
    return router.push("/");
  }

  return (
    <div className="flex min-h-screen mx-auto"
      style={{
        backgroundImage: "url(/assets/images/salade.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      <SaitStaffNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onTabClick={handleTabClick} />
      <div className={`flex-1 flex flex-col mx-auto transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="flex justify-between items-center px-4 py-3 mt-2 mr-5">
          <h1 className="text-lg text-white font-bold inline-flex ml-5">
            <CgProfile className="mr-2 h-5 w-5 mt-1" /> Hi! Name
          </h1>
          <button onClick={handeLogoutClick} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]">
            <LuLogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
        </div>
        <div className="flex-1 p-6">
          {/* select the tab based on the click */}
          {activeTab === 'student' && <SDashboard />}
          {activeTab === 'restaurant' && <RDashboard />}
          {activeTab === 'home' && <Dash />}
          {activeTab === 'setting' && <Settings />}
        </div>
      </div>
    </div>
  );
}
