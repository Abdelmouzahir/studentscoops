'use client';

import React from 'react';
import { Button } from '@/Components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProfileBox() {
    const router = useRouter();

    const handleClick = () => {
        router.push("../auth/sign-in");
    }

  return (
    <Button className="bg-white text-primary"  onClick={handleClick} >Login</Button>
  );
}
