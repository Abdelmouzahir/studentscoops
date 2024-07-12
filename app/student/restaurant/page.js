"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
 
// import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import restaurantsData from '../restaurantsData.json'
import React , { useState ,useEffect } from "react"
import { GiExitDoor } from "react-icons/gi";
import CartDropdown from "@/app/Restrauntitems/checkoutCart/page"

export default function Component() {
  var menuItems = [
    {id:"1",
      name: "Acme Burger",
      description: "A delicious burger with all the fixings.",
      price: 12.99,
      image: "/placeholder.svg",
    },
    {id:"2",
      name: "Acme Salad",
      description: "A fresh and healthy salad.",
      price: 9.99,
      image: "/placeholder.svg",
    },
    {id:"3",
      name: "Acme Pizza",
      description: "A delicious wood-fired pizza.",
      price: 14.99,
      image: "/placeholder.svg",
    },
    {id:"4",
      name: "Acme Pasta",
      description: "A classic pasta dish.",
      price: 11.99,
      image: "/placeholder.svg",
    },
    {id:"5",
      name: "Acme Dessert",
      description: "A delectable dessert.",
      price: 6.99,
      image: "/placeholder.svg",
    },
    {id:"6",
      name: "Acme Drink",
      description: "A refreshing drink.",
      price: 3.99,
      image: "/placeholder.svg",
    },
    {id:"7",
      name: "Acme Appetizer",
      description: "A delicious appetizer.",
      price: 7.99,
      image: "/placeholder.svg",
    },
    {id:"8",
      name: "Acme Entree",
      description: "A delectable entree.",
      price: 15.99,
      image: "/placeholder.svg",
    },
  ]




  const [menuItems1, setMenuItems1] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = parseInt(searchParams.get('restaurantId'), 10);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    // Find the selected restaurant's menu based on restaurantId
    const selectedRestaurant = restaurantsData[0].restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );

    if (selectedRestaurant) {
      setMenuItems1(selectedRestaurant.menu);
      setFilteredItems(selectedRestaurant.menu);
      setRestaurantName(selectedRestaurant.name);
    } else {
      router.push('/student');  // Redirect to home if no restaurant found
    }
  }, [restaurantId, router]);

  useEffect(() => {
    // Filter menu items based on the search term

    setFilteredItems(
      menuItems.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    );
  }, [searchTerm, menuItems1]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleBackToMenu = () => {
    router.push("/student/restaurant");
  }


  const [cart, setCart] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    if (recentlyAdded) {
      const timeout = setTimeout(() => {
        setRecentlyAdded(null);
      }, 3000); // Adjust the timeout duration as needed (e.g., 3000 milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [recentlyAdded]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Item already exists in cart, increment quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );setCart(updatedCart);
      setCartCounter(cartCounter + 1);
    } 
      
      else {
      // Item doesn't exist in cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setRecentlyAdded(item);
    setCartCounter(cartCounter + 1);
  };;

  const removeFromCart = (itemId, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === itemId);
    if (existingItem) {
      if (existingItem.quantity <= quantity) {
        setCart(cart.filter((item) => item.id!== itemId));
      } else {
        setCart(
          cart.map((item) =>
            item.id === itemId? {...item, quantity: item.quantity - quantity } : item
          )
        );
      }
    }
    setCartCounter(cartCounter - 1);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };




  
  

  return (
    <div className="flex flex-col">
         <div className="flex justify-between items-start w-full mt-4 mb-3">
           <Button onClick={handleBackToMenu} className="">
            Back  <GiExitDoor className="ml-3 h-5 w-5" />
           </Button>
            <CartDropdown cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} getTotal={getTotal} />
         </div>

      <section>
        <div className="relative">
          <img src="/placeholder.svg" alt="Restaurant" className="w-full h-[300px] object-cover" />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-2xl font-bold text-white">{restaurantName}</h1>
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
          <div key={item.item_id} className="bg-background rounded-md overflow-hidden shadow-sm">
            <img
              src= "/placeholder.svg"  // Provide a default image if none available
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">${item.price.toFixed(2)}</span>
                <Button size="icon" variant="ghost" className="text-primary" onClick={() => addToCart({ ...item, quantity: 1 })} >
                  <PlusIcon className="w-5 h-5"  />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
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
  )
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
  )}
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
