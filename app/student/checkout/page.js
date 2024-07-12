'use client'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Map from '../map/map'; // Adjust the import path based on your file structure
import Link from 'next/link';
import { ButtonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';


export default function Component() {
  const router = useRouter();

  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: 'Butter Chicken', price: 10.99, quantity: 1 },
    { name: 'Garlic Naan', price: 2.99, quantity: 2 },
    { name: 'Mango Lassi', price: 3.49, quantity: 1 },
  ]);

  const [estimatedTime, setEstimatedTime] = useState('');

  const handleEstimatedTimeChange = (time) => {
    setEstimatedTime(time);
  };

  const handleBackToMenu = () => {
    router.push("/student/restaurant");
  }

  const restaurant = {
    name: 'Punjabi Chaap Corner',
    address: '95 Cityscape Street Northeast, Calgary, Canada',
    position: [51.1207771, -113.9703096], // Lat, Lng coordinates
  };

  const restaurantAddress = '95 cityscape street NE, Calgary';
  const studentAddress = 'SAIT , Calagary';

  const handleQuantityChange = (index, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full h-screen bg-gray-100">
        
      <div className="flex-1 space-y-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Pickup Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full h-64 bg-gray-200 rounded-md">
              <Map
                restaurantAddress={restaurantAddress}
                studentAddress={studentAddress}
                onEstimatedTimeChange={handleEstimatedTimeChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Estimated Time to Reach:</p>
                <p className="font-semibold">{estimatedTime ? `${estimatedTime}` : 'Calculating...'}</p>
              </div>
              <Link
              href={`https://www.google.com/maps/search/?api=1&query=${(restaurantAddress)}`}
              target="_blank"
              className='w-full'>
                    <Button className='w-full'>
                        Navigate to Google Maps
                    </Button>
              </Link>
            </div>
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

      <div className="w-full md:w-96 space-y-6">
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
          <Button className="w-full mt-4">Continue to payment</Button>
          <Button onClick={handleBackToMenu} className="w-full mt-4">Back to Menu</Button>
        </Card>
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
          {isCartSummaryOpen && (
            <div className="mt-4 space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-muted p-4 rounded-md">
                  <img src="/placeholder.svg" alt={item.name} width={64} height={64} className="rounded-md" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(index, -1)}>
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                      <p className="text-sm text-muted-foreground">{item.quantity}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(index, 1)}>
                        <PlusIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-6  rounded-lg shadow-lg">
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

function MinusIcon(props) {
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

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
