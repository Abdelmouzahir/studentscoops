'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; 
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import Link from "next/link"
import Image from 'next/image';
import { Button } from "../../ui/button"
import Home from '../page';

export default function Page() {
const Home = () => {

  const [students, setStudents] = useState([]);
  const router = useRouter();

  const getStudent = async () => {
    try{
    const querySnapshot = await getDocs(collection(db, 'student'));
    const students = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    setStudents(students);
    }catch(err){
      console.error('Error getting student: ', err);
    }
  }

  useEffect(() => {
    getStudent();
  
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

//  useEffect(() => {
//    const user = sessionStorage.getItem('user');
//    if (!user) {
//    router.push('/');
//    }
// }, [router]);

return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
    <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
      <h1 className="text-white text-2xl mb-5">Welcome Home</h1>
      <div className="mb-5">
        {students.length > 0 ? (
          students.map(student => (
            <div key={student.id} className="mb-4 p-4 bg-gray-700 rounded text-white">
              <h2 className="text-xl font-bold">{student.fname}</h2>
              <h2 className="text-xl font-bold">{student.lname}</h2>
              <p>Address: {student.address}</p>
              <p>Phone Number: {student.phoneNumber}</p>
            </div>
          ))
        ) : (
          <p className="text-white">Loading students...</p>
        )}
      </div>
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

}

