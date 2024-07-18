"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const restaurants = [
  {
    id: 1,
    name: "The Gourmet Kitchen",
    address: "123 Food Street, Calgary, AB T2P 0L4",
    img_url: "https://img.freepik.com/free-photo/front-view-delicious-pizza-composition_23-2148787326.jpg",
    menu: [
      {
        item_id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
        price: 12.99,
        img_url: "https://img.freepik.com/free-photo/front-view-delicious-pizza-composition_23-2148787326.jpg"
      },
      // Add other menu items here...
    ]
  },
  // Add other restaurants here...
];

export default function Component() {
  const [openDialogId, setOpenDialogId] = useState(null);

  const handleDialogOpen = (id) => setOpenDialogId(id);
  const handleDialogClose = () => setOpenDialogId(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Past Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={restaurant.img_url}
                alt={restaurant.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <MoveHorizontalIcon className="w-5 h-5 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => handleDialogOpen(restaurant.id)}>
                    <ListIcon className="w-4 h-4 mr-2" />
                    View Order Details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{restaurant.name}</h3>
              <div className="text-gray-500">{restaurant.address}</div>
              <Dialog open={openDialogId === restaurant.id} onOpenChange={handleDialogClose}>
                <DialogContent className="sm:max-w-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold">{restaurant.name}</h2>
                    <DialogClose>
                      
                    </DialogClose>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {restaurant.menu.map((item) => (
                      <div key={item.item_id} className="bg-gray-100 p-2 rounded-lg">
                        <img
                          src={item.img_url}
                          alt={item.name}
                          className="w-full h-16 object-cover rounded-lg mb-1"
                        />
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">Price: ${item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Reorder</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
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
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
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
