"use client"
import React, { useState, useEffect } from 'react';
import Header_stud from './header_stud/page';
import { useUserAuth } from '@/services/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';


const Layout = ({ children }) => {
  const router = useRouter();
  const { user } = useUserAuth();
  const [students, setStudents] = useState([]);

  // handle sign out of the page 
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
    if (user === false) {
      console.log("User not authenticated");
      router.push('/');
    }
  }, [user]);

  return (
    
      <div className="flex flex-col h-screen">
        <Header_stud handleSignOut={handleSignOut}  />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
   
  );
};

export default Layout;
