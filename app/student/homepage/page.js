'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; 
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { getUserInformation } from '@/services/addInformation';
import { useUserAuth } from '@/services/utils';

import Link from "next/link"
import Image from 'next/image';
import { Button } from "./ui/button"

export default function Page() {



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


return (<>
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
          <TableIcon className="h-6 w-6 text-orange-500" />
          <span>Student Scoops</span>
        </Link>
        <nav className="hidden gap-4 md:flex ml-10">
          <Link className="text-lg font-medium hover:underline hover:text-blue" href="#">
            Menu
          </Link>
          <Link className="text-lg font-medium hover:underline hover:text-blue" href="#">
            Restaurants
          </Link>
          <Link className="text-lg font-medium hover:underline hover:text-blue" href="#">
            Profile
          </Link>
        </nav>

        <button class="border border-primary text-primary px-4 py-2 rounded-md hover:bg-black hover:text-white ml-200" >Order Now</button>



      </div>
    </header>
    <main>
      <section
        className="relative w-full bg-gradient-to-r from-orange-50 to-orange-100 py-12 md:py-10 lg:py-10">
        <div className="container grid items-center gap-6 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Discover Discounted Leftovers
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Enjoy delicious leftover meals from local restaurants and cafes at discounted prices. Support your
              community and save money.
            </p>
            <Button variant="outline">
              Order Now
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="sr-only"> Cart</span>
            </Button>
          </div>
          <Image
            alt="Students enjoying discounted leftover food"
            className="mx-auto rounded-full border border-black"
            height={200}
            src="https://i.pinimg.com/564x/87/fb/d6/87fbd64f3517253f85868489f1a1b050.jpg"
            width={1000}
            style={{  width:'900px',height:'500px',objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-12 px-4 md:grid-cols-3 md:px-6">
          <div className="space-y-4 text-center">
            <DiscIcon className="mx-auto h-12 w-12 text-orange-500" />
            <h2 className="text-2xl font-bold">Discounted Leftovers</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Save up to 50% on delicious leftover meals from local restaurants and cafes.
            </p>
            <Button variant="link">Learn More</Button>
          </div>
          <div className="space-y-4 text-center">
            <BuildingIcon className="mx-auto h-12 w-12 text-orange-500" />
            <h2 className="text-2xl font-bold">Support Local Businesses</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Help reduce food waste and support your local community by ordering leftover meals.
            </p>
            <Button variant="link">Learn More</Button>
          </div>
          <div className="space-y-4 text-center">
            <SmartphoneIcon className="mx-auto h-12 w-12 text-orange-500" />
            <h2 className="text-2xl font-bold">Convenient Mobile App</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Easily browse, order, and track your leftover meals on the go with our mobile app.
            </p>
            <Button variant="link">Learn More</Button>
          </div>
        </div>
      </section>
    </main>
    <footer className="w-full bg-gray-100 py-6 dark:bg-gray-800">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Leftovers. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link className="text-sm hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  </>);
};

function BuildingIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>)
  );
}
function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

function DiscIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
    </svg>)
  );
}


function SmartphoneIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>)
  );
}


function TableIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 3v18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
    </svg>)
  );
}


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



