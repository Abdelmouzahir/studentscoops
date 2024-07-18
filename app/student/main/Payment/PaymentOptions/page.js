/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Slv9lfwnT5L
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import React, { useState } from 'react'


import Link from "next/link"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogTrigger,DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Header_stud from "@/app/student/main/header_stud/page"
export default function PaymentOptions() {
  const [cardInfo, setCardInfo] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cvvError, setCVVError] = useState('');

  const [showAlert, setShowAlert] = useState(false)
  const toggleCardInfo = () => {
    setCardInfo(!cardInfo);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/.{1,4}/g); // Split into chunks of 4 digits
    return match ? match.join(' ') : '';
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    if (formattedValue.replace(/\s/g, '').length <= 16) {
      setCardNumber(formattedValue);
      setCardNumberError('');
    } else {
      setCardNumberError('Card number must be 16 digits');
    }
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g,"") //Remove all non digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // Insert the slash
    }
    setExpirationDate(value)
    // Example format: MM/YY
    
    if (value.length == 5) {
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (regex.test(value)) {
        setExpirationDate(value);
      }
      
     else {
      setExpirationDate('');
    }
  }
  };

  const handleCVVChange = (e) => {
    const value = e.target.value;
    setCVV(value);

    if (value.length <= 3) {
    // CVV should be 3 or 4 digits
    const regex = /^[0-9]{3,4}$/;
    if (regex.test(value)) {
      setCVV(value);
      
    } else {
      setCVVError('CVV must be 3 or 4 digits');
    }
  };
  }
  const handleSearch = () => {
  
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 4000)
 
}
  return (
    <>
      <section className="w-full py-12 md:py-20 bg-grey-100">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
            <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
            <div className="grid gap-6">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <CreditCardIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <a
                  onClick={toggleCardInfo}
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Pay with Card
                </a>
                {cardInfo && (
                  <Dialog defaultOpen>
                    <DialogTrigger asChild>
                      {/* Trigger element */}
                      
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Payment</DialogTitle>
                        <DialogDescription>Enter your payment details</DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            pattern="\d*"
                            required
                          />
                          {cardNumberError && (
                            <p className="text-red-500 text-sm">{cardNumberError}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expirationDate">Expiration Date</Label>
                            <Input
                              id="expirationDate"
                              placeholder="MM/YY"
                              type="text"
                              value={expirationDate}
                              onChange={handleExpirationDateChange}
                              maxLength="5"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              type="text"
                              value={cvv}
                              onChange={handleCVVChange}
                              pattern="\d*"
                              maxLength="4"
                              required
                            />
                            {cvvError && (
                              <p className="text-red-500 text-sm">{cvvError}</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input id="cardholderName" placeholder="John Doe" type="text" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleSearch}   
                        
                        className="w-full">
                          Save Details
                          
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                )}
                {showAlert && (
        <div className="fixed p-3 w-30 right-4 p-2 bg-green-500 text-white rounded-md shadow-md" style={{ top: '80px' }}>
          <p>Your Details are saved</p>
        </div>
      )}
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <WalletCardsIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Fast, secure, and easy checkout</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Pay with PayPal
                </a>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
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

function WalletCardsIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  )
}
