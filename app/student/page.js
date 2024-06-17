'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { getUserInformation } from '@/services/GetRequest/getRequest';
import { useUserAuth } from '@/services/utils';

import Link from "next/link";
import { Card } from "../../components/ui/card";
import { Button } from '../../components/ui/button';
import RestrauntCard from '../main-component/layout/restrauntcard/RestrauntCard';
import Header_stud from './header_stud/page';

// Sample data
const sampleData = [
  { id: 1, name: "Tim Hortons - 3660 Westwinds Dr Ne", logo: "https://i.pinimg.com/originals/f7/cf/0e/f7cf0e2a841e1d9133d35c011229619e.jpg", restrauntImage:"https://i.pinimg.com/564x/54/be/c8/54bec83b77017bf5b318acd6ff251d33.jpg",category: "Baked Goods", pickupInfo: "Pick up today 9:00 - 15:00", rating: "4.2", distance: "925 m", price: "$4.99" },

  { id: 2, name: "Subway - 123 Main St", logo: "https://i.pinimg.com/564x/06/e9/2f/06e92f528f9f99d3fa5be897ebb5b0fd.jpg", restrauntImage:"https://i.pinimg.com/564x/33/f0/3a/33f03a27cb78a582b61ab5c87805e856.jpg",category: "Sandwiches", pickupInfo: "Pick up today 10:00 - 15:00", rating: "4.5", distance: "1.2 km", price: "$7.99" },

  { id: 3, name: "Pizza Hut - 456 Elm St",logo: "https://i.pinimg.com/564x/28/d5/23/28d5235efe7816441207e305faca672b.jpg", restrauntImage:"https://i.pinimg.com/564x/39/50/f6/3950f69eaa2efbedaae0094bf2f87044.jpg", category: "Pizza", pickupInfo: "Pick up today 17:00 - 22:00", rating: "4.0", distance: "2.1 km", price: "$12.99" },

  { id: 4, name: "Starbucks - 123 Coffee Ave", logo: "https://i.pinimg.com/564x/53/df/e6/53dfe6a48797869e9742fcd631ee3d06.jpg", restrauntImage:"https://i.pinimg.com/564x/56/65/78/566578f2c85771873e558ef24ed168dd.jpg",category: "Coffee", pickupInfo: "Pick up today 8:00 - 18:00", rating: "4.7", distance: "800 m", price: "$3.99" },

  { id: 5, name: "McDonald's - 456 Burger St", logo: "https://i.pinimg.com/564x/94/c2/66/94c26621509463595f5c5deaab7b7af7.jpg", restrauntImage:"https://i.pinimg.com/564x/83/88/94/838894b2622ad53cfbcff9b6fd8a2bb0.jpg",category: "Fast Food", pickupInfo: "Pick up today 10:00 - 22:00", rating: "4.3", distance: "1.5 km", price: "$5.99" },

  { id: 6, "name": "KFC - 789 Fried Chicken Ln",logo: "https://i.pinimg.com/564x/3a/63/13/3a63135dd9749486af01c7acdb321c5e.jpg", restrauntImage:"https://i.pinimg.com/564x/c2/dc/a3/c2dca3dccfd063ab48cc0e0be0ee8454.jpg", category: "Fried Chicken", pickupInfo: "Pick up today 11:00 - 21:00", rating: "4.6", distance: "2.3 km", price: "$8.99" }
]




const Home = () => {
  const { user } = useUserAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(sampleData);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      const information = getUserInformation(user);
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
      setFilteredData(sampleData);
    } else {
      const results = sampleData.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  return (
    <>
      <main>
        <header><Header_stud handleSignOut={handleSignOut} /></header>

        <section className='flex-1 flex items-center justify-center py-4 md:py-10 lg:py-12'>
          <div className="relative w-full max-w-md ">
            <input
              type="search"
              placeholder="Search for food..."
              className="w-full rounded-full border-2 border-gray-500 px-4 py-3 pr-10 focus:border-gray-700 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
              value={searchTerm}
              onChange={handleSearch}
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

        <section className="w-full py-5 md:py-24 lg:py-2 bg-white dark:bg-[#1e1e1e]">
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
              {filteredData.map((item) => (
                <Link href='/Restrauntitems' key={item.id}>
                  <RestrauntCard
                    name={item.name}
                    logo={item.logo}
                    restrauntImage={item.restrauntImage}
                    category={item.category}
                    pickupInfo={item.pickupInfo}
                    rating={item.rating}
                    distance={item.distance}
                    price={item.price}
                  />
                </Link>
              ))}
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Today's Top Discounted Meal</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out the amazing deal of the day and don't miss your chance to enjoy a delicious meal at a
                  discounted price.
                </p>
              </div>
              <Card className="w-full max-w-3xl">
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

export default Home;
