'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config'; 
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { getUserInformation } from '@/services/addInformation';
import { useUserAuth } from '@/services/utils';
// 
import Link from "next/link";
import { Card, CardContent } from "../../Components/ui/card";
import { Button } from '../../Components/ui/button';
import RestrauntCard from '../main-component/layout/restrauntcard/RestrauntCard';
import Header_stud from '../main-component/layout/header/header_stud/page';




const Home = () => {
//  console.log(RestaurantsData)
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
    router.push('/');
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
  // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
  //   <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
  //     <h1 className="text-white text-2xl mb-5">Welcome Home</h1>
  //     <div className="mb-5">
  //       {students.length > 0 ? (
  //         students.map(student => (
  //           <div key={student.id} className="mb-4 p-4 bg-gray-700 rounded text-white">
  //             <h2 className="text-xl font-bold">{student.name}</h2>
  //             <h2 className="text-xl font-bold">{student.lastName}</h2>
  //             <p>Address: {student.address}</p>
  //             <p>Phone Number: {student.phoneNumber}</p>
  //           </div>
  //         ))
  //       ) : (
  //         <p className="text-white">Loading students...</p>
  //       )}
  //     </div>
  //     <button
  //       onClick={handleSignOut}
  //       className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
  //     >
  //       Sign Out
  //     </button>
  //   </div>
  // </div>
  <>
  <main>
      <header><Header_stud handleSignOut={handleSignOut}/></header>

      <section className='flex-1 flex items-center justify-center py-8 md:py-10 lg:py-12'>
        <div className="relative w-full max-w-md ">
                <input
                  type="search"
                  placeholder="Search for food..."
                  className="w-full rounded-full border-2 border-gray-500 px-4 py-3 pr-10 focus:border-gray-700 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                >
                  <SearchIcon className="h-6 w-6 text-primary" />
                </Button>
        </div>
      </section>
        
     
      <section className="w-full py-12 md:py-24 lg:py-20 bg-white dark:bg-[#1e1e1e]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#f8f9fa] px-3 py-1 text-sm dark:bg-[#2b2b2b]">
                Featured Restaurants
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore Discounted Dining Options</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our app connects you with local eateries offering exclusive discounts for students. Discover a diverse
                range of cuisines and dining experiences at affordable prices.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <Link href='/restraunt/Restrauntitems'>
                <RestrauntCard
                name="Tim Hortons - 3660 Westwinds Dr Ne"
                category= "Baked Goods"
              pickupInfo= "Pick up today 9:00 - 15:00"
                rating= "4.2"
                distance= "925 m"
                price= "$4.99"
                /> </Link>
                <Link href='/restraunt/Restrauntitems'>
              <RestrauntCard
              name= "Subway - 123 Main St"
              category= "Sandwiches"
              pickupInfo= "Pick up today 10:00 - 15:00"
              rating= "4.5"
              distance= "1.2 km"
              price= "$7.99"
              /> </Link>
              <Link href='/restraunt/Restrauntitems'>
              <RestrauntCard
              name= "Pizza Hut - 456 Elm St"
              category= "Pizza"
              pickupInfo= "Pick up today 17:00 - 22:00"
              rating= "4.0"
              distance= "2.1 km"
              price= "$12.99"
              /></Link>
              <Link href='/restraunt/Restrauntitems'>
              <RestrauntCard
              name= "Subway - 123 Main St"
              category= "Sandwiches"
              pickupInfo= "Pick up today 10:00 - 15:00"
              rating= "4.5"
              distance= "1.2 km"
              price= "$7.99"
              /></Link>
              <Link href='/restraunt/Restrauntitems'>
              <RestrauntCard
              name= "Pizza Hut - 456 Elm St"
              category= "Pizza"
              pickupInfo= "Pick up today 17:00 - 22:00"
              rating= "4.0"
              distance= "2.1 km"
              price= "$12.99"
              /></Link>
              <Link href='/restraunt/Restrauntitems'>
              <RestrauntCard
              name="Tim Hortons - 3660 Westwinds Dr Ne"
              category= "Baked Goods"
              pickupInfo= "Pick up today 9:00 - 15:00"
              rating= "4.2"
              distance= "925 m"
              price= "$4.99"
              /></Link>
                
            </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1e1e1e]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-[#f8f9fa] px-3 py-1 text-sm dark:bg-[#2b2b2b]">
                Deal of the Day
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Today\'s Top Discounted Meal</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the amazing deal of the day and don\'t miss your chance to enjoy a delicious meal at a
                discounted price.
              </p>
            </div>
            <Card className="w-full max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src="/placeholder.svg"
                  width="550"
                  height="310"
                  alt="Deal of the Day"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
                <div className="flex flex-col justify-center space-y-4 p-6">
                  <div>
                    <h3 className="text-2xl font-bold">Sushi Extravaganza</h3>
                    <p className="text-gray-500 dark:text-gray-400">50% off all sushi rolls</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">$15.99</p>
                    <Button variant="outline" size="sm">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
 
</>
);
};

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export default Home;
