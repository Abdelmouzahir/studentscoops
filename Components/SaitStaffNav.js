'use client'
import React from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineTeam, AiOutlineShop, AiOutlineSetting } from 'react-icons/ai';
import { FiMenu } from "react-icons/fi";

export const SaitStaffNav = ({ isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`bg-primary text-white h-full fixed p-6 ${isCollapsed ? 'w-20' : 'w-65'} transition-width duration-300 ease-in-out`}>
      <div className="mb-6 flex justify-between items-center">
        <Link href="#" className={`flex items-center gap-2 text-lg font-semibold ${isCollapsed ? 'hidden' : 'block'}`} prefetch={false}>
          <span>Student Scoops</span>
        </Link>
        <button className="flex items-center gap-2 hover:bg-orange-500 rounded-md p-2 ml-1" onClick={toggleSidebar}>
          <FiMenu className="h-6 w-6 min-w-6" />
        </button>
      </div>
      <div className="space-y-4">
        <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
          <AiOutlineHome className="h-6 w-6 min-w-6" />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
          <AiOutlineTeam className="h-6 w-6 min-w-6" />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Student Management</span>
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
          <AiOutlineShop className="h-6 w-6 min-w-6" />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Stores Management</span>
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:bg-orange-500 rounded-md px-3 py-2" prefetch={false}>
          <AiOutlineSetting className="h-6 w-6 min-w-6" />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Setting</span>
        </Link>
      </div>
    </nav>
  );
};

export default SaitStaffNav;
