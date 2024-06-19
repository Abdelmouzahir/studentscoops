"use client";
import { Fragment, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import Modal from "@/components/Modal";
import { BiSolidCommentError } from "react-icons/bi";