"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { getStudentInformation } from '@/services/GetRequest/getRequest';
import { useUserAuth } from '@/services/utils';

import Link from "next/link";
// import { Card } from "../../components/ui/card";
import { Button } from '../../components/ui/button';
import restaurantsData from './restaurantsData.json';  // Import the JSON data correctly
// import Slideshow from '@/components/SlideShow';
import DealoftheDay from '@/components/DealoftheDay';

const Home = () => {



  const { user } = useUserAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(restaurantsData[0].restaurants);  // Initialize with data from JSON
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

  // handle the search function of the page 
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setFilteredData(restaurantsData[0].restaurants);  // Access restaurants array correctly
    } else {
      const results = restaurantsData[0].restaurants.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
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
            {(showAllRestaurants ? filteredData : filteredData.slice(0, 8)).map((restaurant) => (
              <Link
                key={restaurant.id}
                href={{
                  pathname: '/restaurant',
                  query: { restaurantId: restaurant.id }, // Pass the restaurant ID
                }}
                as={`student/restaurant?restaurantId=${restaurant.id}`}
                className="relative overflow-hidden rounded-lg group transition-transform hover:scale-105"
              >
                <img
                  src="/placeholder.svg"
                  alt="Restaurant Image"
                  width={400}
                  height={300}
                  className="object-cover w-full h-60"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-lg font-semibold md:text-xl">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                </div>
              </Link>
            ))}
          </div>
          <div>
            {filteredData.length > 8 && (
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => setShowAllRestaurants(!showAllRestaurants)}>
                  {showAllRestaurants ? "View Less" : "View All"}
                </Button>
              </div>
            )}
          </div>
        </section>
          
        <section className="w-50 py-8 md:py-24 lg:py-32 bg-white dark:bg-[#1e1e1e]">
          <div className="container px-4 md:px-6 ">
            <div className="flex flex-col items-center justify-center space-y-4 text-center shadow-lg ">
              
              <DealoftheDay />
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
      <path d="M6 9V7a4 4 0 0 1 8 0v2M9 9v9M12 12v6m-6 0v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1M6 21h12M3 5h18a1 1 0 0 1 1 1v1H2V6a1 1 0 0 1 1-1z" />
    </svg>
  )
}

export default Home;
