"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";


const CartDropdown = ({ cart, removeFromCart, getTotal }) => {

  const handleRemoveItemClick = (index, e) => {
    e.stopPropagation(); // Prevent the default action (closing dropdown)
    removeFromCart(index); // Call removeFromCart handler
  };
   const handleDropdownClick = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent closing dropdown on other clicks inside dropdown
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <ShoppingCartIcon className="w-5 h-5" />
          <span className="sr-only">Cart</span>
          <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {cart.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12} onClick={handleDropdownClick}>
        <DropdownMenuLabel>Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cart.map((item, index) => (
          <DropdownMenuItem key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={item.image} width={40} height={40} alt="Product Image" className="rounded-md" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="text-sm font-medium">x{item.quantity}</div>
              <Button variant="ghost" size="icon" onClick={(event) => handleRemoveItemClick(index, event)}>
                <span className="sr-only">Remove</span>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center justify-between">
            <div className="font-medium">Total</div>
            <div className="text-sm font-medium">${getTotal().toFixed(2)}</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/Payment'><Button className="w-full bg-primary">Checkout</Button></Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
  
  export default CartDropdown;
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
        <path d="M3 6h18M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6M10 11v6M14 11v6" />
      </svg>
    );
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