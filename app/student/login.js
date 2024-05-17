"use client";
import { useState } from "react";
// import {  } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState("");
  // const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const auth = getAuth();
  const handleSignIn = async () => {
    setError("");
    setEmailError('');

    //check the email domain
    if (!email.endsWith('@edu.sait.ca')){
        setEmailError('Please use a SAIT student email')
        return;
    }

    try {
      //login checking process made by Hunardeep 
      //optimized by Abdel 
      //youtube video used https://www.youtube.com/watch?v=lQftwBTCejE
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      router.push("student/homepage");
    } catch (error) {
      console.error("Error signing in:", error.message);
      //check if there is an issue in credential 
      if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {/*messages shows if there is an error */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {emailError && <div className="text-red-500 text-sm mb-4">{emailError}</div>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Login
        </button>
        <div className="text-white mt-2">
          <span>Don't have an account?</span>
          <Link href="..\student\register">
            <span className="text-blue-500"> Register now</span>
          </Link>
        </div>
        <div className="text-white mt-2">
          <span>Did you forget the password? </span>
          <Link href="..\student\password">
            <span className="text-blue-500">Click here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default Login;