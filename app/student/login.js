"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = (email) => {
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        router.push("/student/homepage");
        setLoginError("");
      })
      .catch((err) => {
        setLoginError("Invalid email or password");
        console.log(err);
      });
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #dfc42f, #faf7df)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url(/assets/images/login.jpeg)" }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-black">
            <h2 className="text-3xl mb-4 text-black">Login</h2>
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
            </div>
            <div>
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            </div>
            <div className="mt-5">
              <p
                className="text-yellow-500 cursor-pointer"
                onClick={() => {
                }}
              >
                Forget Password?
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSignIn}
                className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
              >
                Sign In
              </button>
            </div>

            <div className="mt-3">
              <span className="flex text-black">
                <p>Don't have an account?</p>
                <Link
                  href="/student/register"
                  className="text-yellow-500 font-semibold ml-2"
                >
                  Register
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
