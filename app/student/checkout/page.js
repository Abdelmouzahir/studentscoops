'use client' // Indicates that this component uses client-side features like hooks or context

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Map from '../map/map'; // Adjust the import path based on your file structure
import Link from 'next/link';
import { useCart } from '@/app/Restrauntitems/cart-context/page';
import { ButtonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

// Main functional component
export default function Component() {
  // State to manage the visibility of the cart summary

  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);
  // State to manage the estimated time for pickup
  const [estimatedTime, setEstimatedTime] = useState('');
  // Destructure cart-related methods from the cart context
  const { cartItems, addToCart, removeFromCart } = useCart();
  const handleEstimatedTimeChange = (time) => {
    setEstimatedTime(time);
  };

  const handleBackToMenu = () => {
    router.push("/student/restaurant");
  }

  // Sample data for the restaurant and addresses
  const restaurant = {
    name: 'Punjabi Chaap Corner',
    address: '95 Cityscape Street Northeast, Calgary, Canada',
    position: [51.1207771, -113.9703096], // Latitude and Longitude coordinates
  };

  const restaurantAddress = '95 cityscape street NE, Calgary';
  const studentAddress = 'SAIT, Calgary';

  // Function to handle changes in the estimated time for pickup
  const handleEstimatedTimeChange = (time) => {
    setEstimatedTime(time);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full h-screen bg-gray-100">
      {/* Section for pickup details */}
      <div className="flex-1 space-y-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Pickup Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Map component to show the restaurant and student addresses */}
            <div className="w-full h-64 bg-gray-200 rounded-md">
              <Map
                restaurantAddress={restaurantAddress}
                studentAddress={studentAddress}
                onEstimatedTimeChange={handleEstimatedTimeChange}
              />
            </div>
            {/* Display estimated time to reach */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Estimated Time to Reach:</p>
                <p className="font-semibold">{estimatedTime ? `${estimatedTime}` : 'Calculating...'}</p>
              </div>
              {/* Button to navigate to Google Maps */}
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${(restaurantAddress)}`}
                target="_blank"
                className='w-full'
              >
                <Button className='w-full'>
                  Navigate to Google Maps
                </Button>
              </Link>
            </div>
            {/* Display restaurant details */}
            <div className="flex items-center space-x-2">
              <HomeIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="font-semibold">{restaurant.name}</p>
                <p className="text-sm text-muted-foreground">{restaurant.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section for cart summary and payment details */}
      <div className="w-full md:w-96 space-y-6">
        {/* Card displaying restaurant avatar and address */}
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-2xl">Payment</p>
              <div className='flex justify-center items-center'>
              <p className="text-sm text-muted-foreground">Add Payment Method <span className='ml-[20px]'> <ChevronDownIcon className={`w-6 h-6 text-muted-foreground transition-transform `} > Edit</ChevronDownIcon></span></p></div>
            </div>
          </div>
          {/* Button to proceed to the payment page */}
          <Button className="w-full mt-4">Continue to payment</Button>
          <Button onClick={handleBackToMenu} className="w-full mt-4">Back to Menu</Button>
        </Card>

        {/* Card for displaying the cart summary */}
        <Card className="p-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsCartSummaryOpen(!isCartSummaryOpen)}
          >
            <p className="font-semibold">Cart summary ({cartItems.length} items)</p>
            <ChevronDownIcon
              className={`w-6 h-6 text-muted-foreground transition-transform ${isCartSummaryOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {/* Conditional rendering of cart items based on `isCartSummaryOpen` */}
          {isCartSummaryOpen && (
            <div className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.item_id} className="flex items-center gap-4 bg-muted p-4 rounded-md">
                  <img src="/placeholder.svg" alt={item.name} width={64} height={64} className="rounded-md" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  {/* Button to remove item from cart */}
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.item_id)}>
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Card displaying the order total */}
        <Card className="p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <p className="font-semibold text-lg">Order Total</p>
            <div className='border-black-solid border-b-4'>
              <div className="flex justify-between">
                <p className="text-sm">Subtotal</p>
                <p className="font-medium">
                  ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Taxes</p>
                <p className="font-medium">
                  ${(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.05).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.05).toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Trash Icon component
function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

// Home Icon component
function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// Chevron Down Icon component
function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
