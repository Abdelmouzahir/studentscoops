'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { fetchSignInMethodsForEmail } from "firebase/auth";
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passerror, setPasserror] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignUp = async () => {
    setEmailError('');
    setEmailError('');

    //check the email domain
    if (!email.endsWith('@edu.sait.ca')){
        setEmailError('Please use a SAIT student email')
        return;
    }
    //check if password has upper case small case number and special caracter
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
      setPasserror('Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters.')
      return;
    }

    try {
      //check if email is already in
      const methods = await fetchSignInMethodsForEmail(auth, email)
      if (methods.length > 0){
        setEmailError('This email is already registered.')
        return;
      }

      const res = await createUserWithEmailAndPassword(email, password)
      console.log({res})
      sessionStorage.setItem('user', true)
      setEmail('');
      setPassword('');
      setError('');
      setEmailError('');
      setPasserror('');
      router.push('student/homepage')

    } catch(e){
        console.error(e)
        setEmailError('Failed to create account. Please try again.')
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
          {/*messages shows if there is an error */}
           {emailError && <div className="text-red-500 text-sm mb-4">{emailError}</div>}
  <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          {/*messages shows if there is an error */}
          {passerror && <div className="text-red-500 text-sm mb-4">{passerror}</div>}
  <button 
            onClick={handleSignUp}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
  >
            Sign Up
  </button>
  </div>
  </div>
);
}

export default Register;