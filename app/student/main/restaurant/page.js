"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
// import restaurantsData from '../restaurantsData.json'
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/Restrauntitems/cart-context/page";

import { GiExitDoor } from "react-icons/gi";
import { getRestaurantMenuByStudents } from "@/services/GetRequest/getRequest";

export default function RestaurantMenu() {
  const [menuItems1, setMenuItems1] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = parseInt(searchParams.get("restaurantId"), 10);
  const [restaurantName, setRestaurantName] = useState("");
  const { addToCart } = useCart(); // Use the context
  const [restaurantsData, setRestaurantsData] = useState(null);

  const [restaurant, setRestaurant] = useState([]);

  async function fetchRestaurantMenu() {
    getRestaurantMenuByStudents((data) => {
      console.log("Data: ", data);
      setRestaurantsData(data);
    }, restaurantId);
  }

  useEffect(() => {
    console.log("restaurantId: ", restaurantId);
    if (restaurantId) {
      fetchRestaurantMenu();
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantsData) {
      if (restaurantsData.length > 0) {
        const selectedRestaurant = restaurantsData[0].restaurants.find(
          (restaurant) => restaurant.id === restaurantId
        );

        if (selectedRestaurant) {
          setMenuItems1(selectedRestaurant.menu);
          setFilteredItems(selectedRestaurant.menu);
          setRestaurantName(selectedRestaurant.name);
          setRestaurant(selectedRestaurant);
        } else {
          router.push("/student");
        }
      }
    }
    console.log("restaurant data", restaurantsData);
  }, [restaurantsData, router]);

  useEffect(() => {
    setFilteredItems(
      menuItems1.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, menuItems1]);

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
          <img
            src={restaurant.img_url}
            alt="Restaurant"
            className="w-full h-[300px] object-cover border-2 shadow-xl"
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
        {filteredItems.map((item) => (
          <div
            key={item.item_id}
            className="bg-background  border-2 shadow-xl rounded-md overflow-hidden"
          >
            <img
              src={item.img_url}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">${item.price.toFixed(2)}</span>
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
