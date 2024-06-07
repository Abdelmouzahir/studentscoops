'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

    const handleClick = () => {
        router.push("../auth/sign-in")
      }

  return (
    <header className="flex items-center justify-between p-4 bg-primary">
      <div className="text-white font-semibold text-2xl">STUDENT SCOOPS</div>
      <Button className="bg-white text-primary"  onClick={handleClick} >Login</Button>
    </header>
  );
}
