'use client';

import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

    const handleClick = () => {
        router.push("/auth/sign-in")
      }

  return (
    <header className="flex items-center justify-between p-4 bg-primary">
      <div className="text-white font-semibold text-2xl">STUDENT SCOOPS</div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 bg-white text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Login
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800 mr-4 ">
        <DropdownMenuItem>
          <Link href="/auth/sign-in" className="flex items-center gap-2 hover:text-primary " prefetch={false} >
            <UserIcon className="h-4 w-4" />
            Student
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/restraunt" className="flex items-center gap-2 hover:text-primary" prefetch={false}>
            <MenuIcon className="h-4 w-4" />
            Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/auth/register" className="flex items-center gap-2 hover:text-primary" prefetch={false}>
            <PlusIcon className="h-4 w-4" />
            New User
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}