import React from 'react'
import Link from 'next/link'
import { AiOutlineHome, AiOutlineTeam, AiOutlineShop, AiOutlineSetting } from 'react-icons/ai'


export const SaitStaffNav = () => {
  return (
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
  )
}

export default SaitStaffNav
