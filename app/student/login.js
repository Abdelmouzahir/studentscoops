"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchSignInMethodsForEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  
  const handleSignIn = async () => {
    setError('');
    
    //check if email exist 
    const methods = await fetchSignInMethodsForEmail(auth, email)
    if (methods.length === 0){
      setError('This email is not registered.')
      return;
    }

    //check the email domain
    if (!email.endsWith('@edu.sait.ca')){
        setError('Please Login with SAIT student email')
        return;
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      setError("");
      router.push('student/homepage');
    } catch (e) {
      console.error(e);

      //handle auth errors
      switch (e.code) {
        case 'auth/user-not-found':
          setError('This email is not registered.');
          break;
        case 'auth/wrong-password':
          setError('Invalid password.');
          break;
        default:
          setError('Failed to login. Please try again.');
          break;
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
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
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
          <Link href="student\register">
            <span className="text-blue-500"> Register now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
