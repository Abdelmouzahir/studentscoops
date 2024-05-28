'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; 
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { getUserInformation } from '@/services/addInformation';
import { useUserAuth } from '@/services/utils';

const Home = () => {
  const { user } = useUserAuth();
  const [students, setStudents] = useState([]);
  const router = useRouter();

  useEffect(() => {
  if(user !== null){
    const information = getUserInformation(user);
    setStudents(information);
    information.then((data) => {
      setStudents(data);
      console.log("Data: ", data);
    });
    
    console.log("User ID in page:", user); // Log the user ID
    console.log("User Information: ", information)
  }
  if(user === false){
    console.log("User not authenticated");
    router.push('/student');
  }
  }, [user])
  console.log("students data",students);
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
              <h2 className="text-xl font-bold">{student.name}</h2>
              <h2 className="text-xl font-bold">{student.lastName}</h2>
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

export default Home;