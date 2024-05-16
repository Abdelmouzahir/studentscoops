'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; 
import { signOut } from 'firebase/auth';

const Home = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Welcome Home</h1>
        <button
          onClick={handleSignOut}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
