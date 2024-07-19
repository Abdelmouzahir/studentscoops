"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
// import restaurantsData from '../restaurantsData.json'
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/Restrauntitems/cart-context/page";
import Image from "next/image";

import { GiExitDoor } from "react-icons/gi";
import {
  getRestaurantMenuByStudents,
  getRestaurantDataByOwner,
} from "@/services/GetRequest/getRequest";

export default function RestaurantMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const restaurantUid = searchParams.get("uid");
  const [restaurantName, setRestaurantName] = useState("");
  const { addToCart } = useCart(); // Use the context
  const [restaurantImage, setRestaurantImage] = useState("");

  const [restaurant, setRestaurant] = useState([]);

  async function fetchRestaurantMenu() {
    getRestaurantMenuByStudents((data) => {
      console.log("Data: ", data);
      setFilteredItems(data);
    }, restaurantId);
  }
  async function fetchRestaurantData() {
    getRestaurantDataByOwner((data) => {
      console.log("Data: ", data);
      setRestaurantName(data[0].name);
      setRestaurantImage(data[0].imgUrl);
    }, restaurantUid);
  }

  useEffect(() => {
    fetchRestaurantMenu();
    fetchRestaurantData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBackToMenu = () => {
    router.push("/student/main/restaurant");
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start w-full mt-4 mb-3">
        <Button onClick={handleBackToMenu} className="">
          Back <GiExitDoor className="ml-3 h-5 w-5" />
        </Button>
      </div>
      <section>
        <div className="relative">
          <Image
            src={
              restaurantImage
                ? restaurantImage
                : "/assets/images/UserDefaultSaitStaff.png"
            }
            alt="Restaurant"
            width={1200}
            height={400}
            className="w-full h-[300px] object-cover p-2 border-2 shadow-xl"
          />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-4xl font-bold  text-black">{restaurantName}</h1>
          </div>
          <div className="absolute bottom-4 right-4">
            <Input
              type="search"
              placeholder="Search in the menu"
              className="pl-8 pr-4 py-2 rounded-full bg-white shadow-md w-80"
              value={searchTerm}
              onChange={handleSearch}
            />
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems && filteredItems.length > 0 && filteredItems != null ? (
          <>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-background  border-2 shadow-xl rounded-md overflow-hidden"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover bg-cover bg-center m-2"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">${item.price}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-primary"
                      onClick={() => addToCart(item, restaurant)}
                    >
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-screen w-full text-center justify-center items-center text-3xl animate-pulse">
            Loading..
          </div>
        )}
      </section>
    </div>
  );
}
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
  );
}
function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
