'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { getStudentInformation } from '@/services/GetRequest/getRequest';
import { useUserAuth } from '@/services/utils';

import Link from "next/link";
import { Card } from "../../components/ui/card";
import { Button } from '../../components/ui/button';
import RestrauntCard from '../main-component/layout/restrauntcard/RestrauntCard';
import Header_stud from './header_stud/page';

const restaurants = [
  {
    name: "Acme Bistro",
    address: "123 Main St, Anytown USA",
    imageUrl: "/placeholder.svg?height=300&width=400",
    id: 1,
  },
  {
    name: "Sushi Delight",
    address: "456 Oak Rd, Somewhere City",
    imageUrl: "/placeholder.svg?height=300&width=400",
    id: 2,
  },
  {
    name: "Gourmet Grill",
    address: "789 Elm St, Somewhere Else",
    imageUrl: "/placeholder.svg?height=300&width=400",
    id: 4,
  },
  {
    name: "Cafe Deluxe",
    address: "321 Oak Blvd, Somewhere Else",
    imageUrl: "/placeholder.svg?height=300&width=400",
    id: 5,
  },
  {
    name: "Spice Emporium",
    address: "159 Maple Ave, Somewhere Else",
    imageUrl: "/placeholder.svg?height=300&width=400",
    id: 6,
  },
  {
    name: "Pasta Palace",
    address: "789 Elm St, Somewhere Else",
    imageUrl: "/placeholder.svg?height=300&width=400",
    id: 7,
  },
  {
    id: 8,
    name: "Seafood Sensation",
    address: "678 Birch Rd, Seaside",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Fusion Flavors",
    address: "012 Willow St, Cosmopolis",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Comfort Cuisine",
    address: "345 Oak Ave, Homeville",
    imageUrl: "/placeholder.svg",
  },
]

const cuisines = [
  {
    id: 1,
    name: "Italian",
    icon: "Pizza",
  },
  {
    id: 2,
    name: "Japanese",
    icon: "Sushi",
  },
  {
    id: 3,
    name: "American",
    icon: "Burger",
  },
  {
    id: 4,
    name: "Mexican",
    icon: "Taco",
  },
]

export let object = null;

const Home = () => {
  const { user } = useUserAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(restaurants);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      const information = getStudentInformation(user);
      setStudents(information);
      information.then((data) => {
        setStudents(data);
        console.log("Data: ", data);
      });
      console.log("User ID in page:", user); // Log the user ID
      console.log("User Information: ", information);
    }
    if (user === false) {
      console.log("User not authenticated");
      router.push('/');
    }
  }, [user]);

  console.log("students data", students);

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

  // handle the search function of the page 
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setFilteredData(restaurants);
    } else {
      const results = restaurants.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  const [showAllRestaurants, setShowAllRestaurants] = useState(false)
  return (
    <>
      <main>
        
        <section className="mb-8">
          <div className='flex items-center justify-between mb-6'>
          <h2 className="text-4xl font-bold mb-4">Featured Restaurants</h2>
              <div className="relative w-full max-w-md ">
                  <input
                    type="search"
                    placeholder="Search for restaurants..."
                    className="w-full rounded-full border-2 border-gray-300 px-4 py-3 pr-10 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                  >
                    <SearchIcon className="h-6 w-6 text-primary" />
                  </button>
                </div>
          </div>
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
            {(showAllRestaurants ? restaurants : restaurants.slice(0, 8)).map((restaurant) => (
              <div
                key={restaurant.id}
                className="relative overflow-hidden rounded-lg group transition-transform hover:scale-105"
              >
                <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                  <span className="sr-only">View Restaurant</span>
                </Link>
                <img
                  src={restaurant.imageUrl}
                  alt="Restaurant Image"
                  width={400}
                  height={300}
                  className="object-cover w-full h-60"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-lg font-semibold md:text-xl">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
          {restaurants.length > 8 && (
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={() => setShowAllRestaurants(!showAllRestaurants)}>
                {showAllRestaurants ? "View Less" : "View All"}
              </Button>
            </div>
          )}
          </div>
        </section>
          
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#1e1e1e]">
          <div className="container px-4 md:px-6 ">
            <div className="flex flex-col items-center justify-center space-y-4 text-center shadow-lg ">
              <div className="space-y-2 border-yellow-700 ">
                <div className="inline-block rounded-lg bg-[#f8f9fa] px-3 py-1 text-sm dark:bg-[#2b2b2b]">
                  Deal of the Day
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Today's Top Discounted Meal</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out the amazing deal of the day and don't miss your chance to enjoy a delicious meal at a
                  discounted price.
                </p>
              </div>
              <Card className="w-full max-w-3xl p-2 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img
                    src="https://i.pinimg.com/564x/9b/4f/87/9b4f877a9336c4a4cfc2291ffd8d557e.jpg"
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

function CookingPotIcon(props) {
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
      <path d="M2 12h20" />
      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <path d="m4 8 16-4" />
      <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
    </svg>
  )
}

export default Home;
