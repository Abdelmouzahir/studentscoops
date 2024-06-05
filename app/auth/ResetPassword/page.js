'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import zxcvbn from 'zxcvbn';
import { FaCheckCircle } from 'react-icons/fa'; 
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidCommentError } from "react-icons/bi";
