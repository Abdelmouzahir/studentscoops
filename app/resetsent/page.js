'use client';
import { useState } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from "firebase/auth";
import Link from 'next/link';

const AfterResetPassword = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/student");
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Thank you! an email was sent to your email address.</h1>
        <h1 className="text-white text-2xl mb-5">Please check your email for future instruction</h1>
        <button 
          onClick={handleClick}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Back to Login page
        </button>
      </div>
    </div>
  );
};

export default AfterResetPassword;
