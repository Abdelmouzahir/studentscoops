'use client';

import React from 'react';
import Navigating from './navigating';
import ProfileBox from './profile-box';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <div className="text-primary font-semibold text-2xl">STUDENT SCOOPS</div>
      <Navigating className="sm:hidden" />
      <ProfileBox />
    </header>
  );
}
