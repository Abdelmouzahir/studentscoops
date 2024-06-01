"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  

  const handleSignIn = () => {
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User ID:", user.uid);
        sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        console.log("User logged in successfully");
        router.push("/student/homepage");
      })
      .catch((err) => {
        console.error("error message", err.message);
        console.log("User not logged in")
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "linear-gradient(115deg, #dfc42f, #faf7df)" }}
    >
      <div className="max-w-screen-xl w-10/12 lg:w-8/12 grid grid-row-2 sm:grid-cols-2 py-40">
        <div className="w-full h-full col-span-1 relative bg-cover bg-center bg-no-repeat"
        style={{backgroundImage:"url(/assets/images/AdobeStock_286178925_Preview.jpeg)"}}>
          <div style={{height:"25vh"}}/>
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-10 bg-white px-12 py-16 text-center w-full">
          <h1 className="text-black text-3xl mx-auto mb-4 ">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-black border-gray-400 py-1 px-2 w-full rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-black border-gray-400 py-1 px-2 w-full rounded-md"
          />
          <button
            onClick={handleSignIn}
            className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
          >
            Login
          </button>
          <div className="text-white mt-2 sm:text-xl">
            <span className="text-black">Don't have an account?</span>
            <Link href="..\student\register">
              <span className="text-yellow-500 font-semibold">
                {" "}
                Register now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
