"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function CheckoutCart() {

    return (<>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="sr-only">Cart</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={12}>
            <DropdownMenuLabel>Cart</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {cart.map((item, index) => (
                <DropdownMenuItem key={index} >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={item.image} width={40} height={40} alt="Product Image" className="rounded-md" />
                            <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="text-sm font-medium">x{item.quantity}</div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
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
                {/* Link changes to be made */}
                <Link href='/Payment'><Button className="w-full bg-primary">Checkout</Button></Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </> )
}
