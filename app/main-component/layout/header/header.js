'use client';

import React from 'react';
import ProfileBox from './profile-box';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-primary">
      <div className="text-white font-semibold text-2xl">STUDENT SCOOPS</div>
      <ProfileBox />
    </header>
  );
}
