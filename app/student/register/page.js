'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword === password) {
        setIsPasswordMatch(true);
        setConfirmPassError('');
      } else {
        setIsPasswordMatch(false);
        setConfirmPassError('Passwords do not match');
      }
    } else {
      setIsPasswordMatch(false);
      setConfirmPassError('');
    }
  }, [confirmPassword, password]);

  const handleSignUp = async () => {
    setEmailError('');
    setPassError('');
    setError('');

    // Check the email domain
    if (!email.endsWith('@edu.sait.ca')) {
      setEmailError('Please use a SAIT student email');
      return;
    }

    // Check if password has uppercase, lowercase, number, and special character
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPassError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
      return;
    }
    
    // Check if passwords match
    if (!isPasswordMatch) {
      setConfirmPassError('Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      router.push("/student/information");
    } catch (e) {
      // Check if the user already exists in the database
      console.error("Error registering:", e.message);
      if (e.code === "auth/email-already-in-use") {
        setEmailError('This email is already registered.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {emailError && <div className="text-red-500 text-sm mb-4">{emailError}</div>}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-2 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <p className='text-white mb-1 text-sm'>Min 8 characters, including uppercase, lowercase, number, and special character</p>
        {passError && <div className="text-red-500 text-sm mb-4">{passError}</div>}
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {confirmPassError && <div className="text-red-500 text-sm mb-4">{confirmPassError}</div>}
        {isPasswordMatch && confirmPassword && <div className="text-green-500 text-sm mb-4">Password match!</div>}
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Register;
