'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import zxcvbn from 'zxcvbn';
import { FaCheckCircle } from 'react-icons/fa'; 
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidCommentError } from "react-icons/bi";

//backend part 






//frontend part 
const getPasswordStrengthBar = (score) => {
  const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const width = ['w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'];
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-700'];
  const textColor = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-green-700'];
  return (
    <div className="mt-2 flex items-center">
      <div className={`h-2 ${colors[score]} ${width[score]} rounded-md mr-2`}></div>
      <p className={`text-sm ${textColor[score]}`}>{strength[score]}</p>
    </div>
  );
};



