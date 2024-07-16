"use client"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import CartDropdown from "@/app/Restrauntitems/checkoutCart/page"
// import { useState, useEffect } from "react"
// import CartDropdown from "@/app/Restrauntitems/checkoutCart/page"
  

// export default function Header_stud({ handleSignOut,cart, removeFromCart, getTotal }) {
// Essential import and export 


export default function Header_stud({ handleSignOut }) {


  // const [cart, setCart] = useState([]);
  // const [recentlyAdded, setRecentlyAdded] = useState(null);
  // const [cartCounter, setCartCounter] = useState(0);

  // useEffect(() => {
  //   if (recentlyAdded) {
  //     const timeout = setTimeout(() => {
  //       setRecentlyAdded(null);
  //     }, 3000); // Adjust the timeout duration as needed (e.g., 3000 milliseconds)
  //     return () => clearTimeout(timeout);
  //   }
  // }, [recentlyAdded]);

  // const addToCart = (item) => {
  //   const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  //   if (existingItem) {
  //     // Item already exists in cart, increment quantity
  //     const updatedCart = cart.map((cartItem) =>
  //       cartItem.id === item.id
  //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //         : cartItem
  //     );setCart(updatedCart);
  //     setCartCounter(cartCounter + 1);
  //   } 
      
  //     else {
  //     // Item doesn't exist in cart, add it with quantity 1
  //     setCart([...cart, { ...item, quantity: 1 }]);
  //   }
  //   setRecentlyAdded(item);
  //   setCartCounter(cartCounter + 1);
  // };;

  // const removeFromCart = (itemId, quantity = 1) => {
  //   const existingItem = cart.find((item) => item.id === itemId);
  //   if (existingItem) {
  //     if (existingItem.quantity <= quantity) {
  //       setCart(cart.filter((item) => item.id!== itemId));
  //     } else {
  //       setCart(
  //         cart.map((item) =>
  //           item.id === itemId? {...item, quantity: item.quantity - quantity } : item
  //         )
  //       );
  //     }
  //   }
  //   setCartCounter(cartCounter - 1);
  // };

  // const getTotal = () => {
  //   return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  // };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-primary shadow-sm dark:bg-gray-950">
      <div className=" flex items-center gap-4">
        <Link href="/student" className="flex items-center gap-2 text-2xl font-bold text-white" prefetch={false}>
          <span >STUDENT SCOOPS</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
      {/* <CartDropdown cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} getTotal={getTotal}  /> */}
      <CartDropdown className='text-primary' />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full ">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width={32} height={28} alt="Avatar" className="rounded-full" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={12}>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <Link href="/student/myprofile" className="flex items-center gap-2" prefetch={false}>
                <ProfileIcon className="w-4 h-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/student/Payment/PaymentOptions" className="flex items-center gap-2" prefetch={false}>
                <CreditCardIcon className="w-4 h-4" />
                Payment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/student/setting" className="flex items-center gap-2" prefetch={false}>
                <SettingsIcon className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/student/orderHistory" className="flex items-center gap-2" prefetch={false}>
                <ListIcon className="w-4 h-4" />
                Order History
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="destructive" className="w-full bg-primary" onClick={handleSignOut}>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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
  )
}
function ProfileIcon(props) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}