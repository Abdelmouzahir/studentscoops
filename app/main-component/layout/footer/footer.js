import React from 'react'
import Link from 'next/link'
export default function Footer(){
    return(
        <footer className="w-full bg-gray-100 py-6 dark:bg-gray-800">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Leftovers. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link className="text-sm hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    )
}